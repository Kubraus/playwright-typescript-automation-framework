import type { Reporter, TestCase, TestResult, FullConfig } from '@playwright/test/reporter';
import type { SourceLocation } from '../ai/source-code-extractor';
import { extractSourceCode, extractSourceLocation } from '../ai/source-code-extractor';
import { analyzeFailure } from '../ai/failure-analyzer';

export default class AiFailureReporter implements Reporter {
  private maxRetries = 0;

  onBegin(config: FullConfig) {
    this.maxRetries = config.projects[0].retries;
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    try {
      if (result.status !== 'failed' && result.status !== 'timedOut') {
        return;
      }
      if (result.retry < this.maxRetries) {
        return;
      }
      if (result.error === undefined) {
        return;
      }
      const errorWithLocation = result.errors.find((error) => error.location !== undefined);
      const selectedError = errorWithLocation ?? result.error;
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
        console.log(analysis);
      }
    } catch {
      console.error('[AI Analyzer] Unexpected analyzer failure');
    }
  }
}
