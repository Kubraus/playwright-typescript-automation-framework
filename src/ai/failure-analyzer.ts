import { sendPrompt } from './openai-client';
import { redactSecrets, removeAnsiCodes } from './secret-redactor';

interface FailureContext {
  testName: string;
  errorMessage: string;
  stackTrace?: string;
  sourceCode?: string;
}

export async function analyzeFailure(context: FailureContext): Promise<string | undefined> {
  const safeTestName = redactSecrets(context.testName);
  const safeErrorMessage = redactSecrets(removeAnsiCodes(context.errorMessage));
  const safeStackTrace = redactSecrets(removeAnsiCodes(context.stackTrace ?? 'Not available'));
  const safeSourceCode = redactSecrets(context.sourceCode ?? 'Not available');
  const prompt = `
  Analyze this Playwright test failure.
  Base your analysis solely on the evidence provided. Do not invent code, locators, or application behavior that is not supported by the evidence provided.
  [REDACTED] was inserted by the sanitizer and was not literally part of the original code or data. Do not treat it as an original value.
  You should never suggest disabling, bypassing, or weakening the sanitization or redaction of secrets.
  Clearly distinguish between facts derived from the data provided and possible hypotheses.
  If there isn't enough evidence, just say so instead of trying to fill in the gaps.
  Always start your answer with the "Failure Summary" section, where you’ll describe what went wrong in no more than two short sentences.
  After the "Failure Summary" section, always create a subsequent "Evidence" section containing only specific facts derived from the error message, stack trace, and source code.
  After the "Evidence" section, there should always be a "Possible Causes" section, containing only causes or hypotheses supported by the evidence presented. 
  If it is not possible to identify a plausible cause based on the available data, state this explicitly.
  "Possible Causes" must always be followed by "Suggested Next Steps" which should include specific diagnostic or corrective steps based on the available evidence.
  The model must not suggest specific changes to the code if there is no basis for them in the provided code.
  
  Test Name: 
  ${safeTestName} 
   
  Error Message:
  ${safeErrorMessage}
   
  Stack Trace:
  ${safeStackTrace}
  
  Source Code:
  ${safeSourceCode}`;

  return sendPrompt(prompt);
}
