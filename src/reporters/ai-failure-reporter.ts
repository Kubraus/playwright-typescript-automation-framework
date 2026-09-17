import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { extractSourceCode, extractSourceLocation } from '../ai/source-code-extractor';
import { analyzeFailure } from '../ai/failure-analyzer';

export default class AiFailureReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    try {
      if (result.status !== 'failed') {
        return;
      }
      if (result.error === undefined) {
        return;
      }
      const errorMessage = result.error.message ?? 'Not available';
      const stackTrace = result.error.stack;
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
