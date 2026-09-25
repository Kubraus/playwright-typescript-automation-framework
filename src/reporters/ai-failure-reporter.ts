import type { Reporter, TestCase, TestResult, FullConfig } from '@playwright/test/reporter';
import type { SourceLocation } from '../ai/source-code-extractor';
import { extractSourceCode, extractSourceLocation } from '../ai/source-code-extractor';
import { analyzeFailure } from '../ai/failure-analyzer';
import { writeFile, mkdir, rm } from 'fs/promises';
import { resolve } from 'node:path';

interface FailureAnalysis {
  testName: string;
  analysis: string;
}

export default class AiFailureReporter implements Reporter {
  private maxRetries = 0;
  private analyses: FailureAnalysis[] = [];
  private pendingAnalyses: Promise<void>[] = [];
  private readonly maxAnalyses = 5;
  private startedAnalyses = 0;

  private async processTestEnd(test: TestCase, result: TestResult): Promise<void> {
    try {
      if (result.status !== 'failed' && result.status !== 'timedOut') {
        return;
      }
      // Analyze only the final failed attempt to avoid duplicate AI requests for retries.
      if (result.retry < this.maxRetries) {
        return;
      }
      // Prefer an error with source location so the analyzer can include relevant source code.
      const errorWithLocation = result.errors.find((error) => error.location !== undefined);
      const selectedError = errorWithLocation ?? result.errors[0] ?? result.error;
      if (selectedError === undefined) {
        return;
      }
      let locationFromSelectedError: SourceLocation | undefined;
      if (selectedError.location !== undefined) {
        locationFromSelectedError = {
          filePath: selectedError.location.file,
          line: selectedError.location.line,
          column: selectedError.location.column,
        };
      }

      const errorMessage = selectedError.message ?? 'Not available';
      const stackTrace = selectedError.stack;
      const testName = test.title;
      let sourceCode: string | undefined;
      const location =
        locationFromSelectedError ??
        (stackTrace !== undefined ? extractSourceLocation(stackTrace) : undefined);
      if (location !== undefined && location !== null) {
        sourceCode = await extractSourceCode(location);
      }
      // Limit AI requests per test run to control cost and execution time.
      if (this.startedAnalyses >= this.maxAnalyses) {
        return;
      }
      this.startedAnalyses += 1;
      const analysis = await analyzeFailure({
        testName,
        errorMessage,
        stackTrace,
        sourceCode,
      });
      if (analysis !== undefined) {
        this.analyses.push({
          testName,
          analysis,
        });
      }
    } catch {
      console.error('[AI Analyzer] Unexpected analyzer failure');
    }
  }

  onBegin(config: FullConfig) {
    this.maxRetries = config.projects[0].retries;
  }

  onTestEnd(test: TestCase, result: TestResult) {
    // Track analysis promises so Playwright can continue while AI requests run in parallel.
    const processTestEnd = this.processTestEnd(test, result);
    this.pendingAnalyses.push(processTestEnd);
  }

  async onEnd() {
    // Wait for every started analysis without letting one rejected promise block report generation.
    await Promise.allSettled(this.pendingAnalyses);
    const reportDirectory = resolve(process.cwd(), 'test-results');
    const reportPath = resolve(reportDirectory, 'ai-failure-analysis.md');
    if (this.analyses.length === 0) {
      try {
        await rm(reportPath, { force: true });
      } catch {
        console.error('[AI Analyzer] Unable to remove outdated AI failure report');
      }
      return;
    }
    const report = this.analyses
      .map((item) => {
        return `## ${item.testName}\n\n${item.analysis}`;
      })
      .join('\n\n');
    try {
      await mkdir(reportDirectory, { recursive: true });
      await writeFile(reportPath, report);
    } catch {
      console.error('[AI Analyzer] Unable to write AI failure report');
    }
  }
}
