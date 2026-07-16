import { defineConfig } from '@playwright/test';
import path from 'path';

const authFile = path.join(process.cwd(), 'creds/.auth/webLocalData.json');

export default defineConfig({
  testDir: './tests',
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