import type { Reporter, TestCase, TestResult, FullConfig } from '@playwright/test/reporter';
import type { SourceLocation } from '../ai/source-code-extractor';
import { extractSourceCode, extractSourceLocation } from '../ai/source-code-extractor';
import { analyzeFailure } from '../ai/failure-analyzer';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'node:path';

interface FailureAnalysis {
  testName: string;
  analysis: string;
}

export default class AiFailureReporter implements Reporter {
  private maxRetries = 0;
  private analyses: FailureAnalysis[] = [];
  private pendingAnalyses: Promise<void>[] = [];

  private async processTestEnd(test: TestCase, result: TestResult): Promise<void> {
    try {
      if (result.status !== 'failed' && result.status !== 'timedOut') {
        return;
      }
      if (result.retry < this.maxRetries) {
        return;
      }
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
    const processTestEnd = this.processTestEnd(test, result);
    this.pendingAnalyses.push(processTestEnd);
  }

  async onEnd() {
    await Promise.all(this.pendingAnalyses);
    if (this.analyses.length === 0) {
      return;
    }
    const reportDirectory = resolve(process.cwd(), 'test-results');
    const reportPath = resolve(reportDirectory, 'ai-failure-analysis.md');
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
