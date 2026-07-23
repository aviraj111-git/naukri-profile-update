import { defineConfig } from '@playwright/test';
import path from 'path';
import {env} from './src/utility/env.js';

const authFile = path.join(process.cwd(), 'creds/.auth/webLocalData.json');

const rpConfig = {
  apiKey: env.RP_UUID,
  endpoint: 'https://demo.reportportal.io/api/v1',
  project: 'default_personal',          
  launch: 'Profile Update Test Execution',
  attributes: [
    { key: 'platform', value: 'windows 10' },
    { value: 'demo' }
  ],
  mode: 'DEFAULT',
  description: 'Automated E2E tests run via Playwright',
};

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html'], 
    ['@reportportal/agent-js-playwright', rpConfig]
  ],
  use: {
    baseURL: 'https://www.naukri.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 }, 
      }
    },
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        storageState: authFile,
      },
      dependencies: ['setup'], 
    },
  ],
});