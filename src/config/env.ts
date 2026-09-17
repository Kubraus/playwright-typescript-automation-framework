import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.BASE_URL;
const apiURL = process.env.API_URL;
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!baseURL || !apiURL) {
  throw new Error('BASE_URL or API_URL must be provided');
}

export const env = {
  BASE_URL: baseURL,
  API_URL: apiURL,
  OPENAI_API_KEY: openaiApiKey,
};
