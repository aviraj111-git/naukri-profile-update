import { defineConfig } from '@playwright/test';
import path from 'path';

const authFile = path.join(process.cwd(), 'naukri/.auth/creds.json');

export default defineConfig({
  testDir: './tests',
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  projects: [
    // 1. Setup project (DO NOT pass storageState here)
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 }, 
      }
    },
    // 2. Main testing project (Only pass storageState here)
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        storageState: authFile,
        launchOptions: {
          args: ['--headless=new']
        }
      },
      dependencies: ['setup'], 
    },
  ],
});