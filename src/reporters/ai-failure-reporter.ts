import type { Reporter, TestCase, TestResult, FullConfig } from '@playwright/test/reporter';
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
      const errorMessage = selectedError.message ?? 'Not available';
      const stackTrace = selectedError.stack;
      const testName = test.title;
      let sourceCode: string | undefined;
      if (stackTrace !== undefined) {
        const location = extractSourceLocation(stackTrace);
        if (location !== null) {
          sourceCode = await extractSourceCode(location);
        }
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
