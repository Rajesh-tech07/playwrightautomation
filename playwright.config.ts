import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: env.baseURL,
    trace: 'retain-on-failure',
    // Keep local actions slow enough to watch; CI runs at normal speed.
    launchOptions: { slowMo: isCI ? 0 : 500 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
