import dotenv from 'dotenv';
import { resolve } from 'node:path';

const testEnv = (process.env.TEST_ENV ?? 'sit').trim().toLowerCase();



if (!['sit', 'uat'].includes(testEnv)) {
  throw new Error(`Unknown TEST_ENV: ${testEnv}. Use sit or uat.`);
}

dotenv.config({ path: resolve(__dirname, `../.env.${testEnv}`) });

const baseURL = process.env.BASE_URL?.trim();
if (!baseURL) {
  throw new Error(`Set BASE_URL in .env.${testEnv} or in your environment`);
}

export const env = {
  baseURL,
  username: process.env.USER_NAME ?? '', pass: process.env.PASSWORD ?? ''

};
