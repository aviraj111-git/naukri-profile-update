import { test as setup } from '@playwright/test';
import path from 'path';
import {env} from '../src/utility/env.js';

const authFile = path.join(process.cwd(), 'naukri/.auth/creds.json');

setup('authenticate and save session storage', async ({ page }) => {
  // Navigate and perform login actions
  await page.goto('https://www.naukri.com/nlogin/login');
  await page.locator('#usernameField').fill(env.USER_NAME);
  await page.locator('#passwordField').fill(env.PASSWORD);
   await page.getByRole('button', { name: 'Login', exact: true }).click();

  // Ensure login is completed fully before capturing state
  await page.waitForURL('**/homepage**');

  // Persist session cookies and storage state to disk
  await page.context().storageState({ path: authFile });
});