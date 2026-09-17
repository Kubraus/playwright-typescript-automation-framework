import OpenAI from 'openai';
import { env } from '../config/env';

const openaiApiKey = env.OPENAI_API_KEY;

export async function sendPrompt(prompt: string): Promise<string | undefined> {
  if (!openaiApiKey) {
    console.error('[AI Analyzer] OPENAI_API_KEY is not configured');
    return undefined;
  }
  try {
    const openAi = new OpenAI({
      apiKey: openaiApiKey,
      timeout: 30 * 1000,
      maxRetries: 0,
    });
    const response = await openAi.responses.create({
      model: 'gpt-5.6-luna',
      input: prompt,
      store: false,
    });
    return response.output_text;
  } catch {
    console.error(`[AI Analyzer] Unable to get AI response`);
    return undefined;
  }
}
