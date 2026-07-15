import { test as setup } from '@playwright/test';
import path from 'path';
import {env} from '../src/utility/env.js';

const authFile = path.join(process.cwd(), 'naukri/.auth/creds.json');

setup('authenticate and save session storage', async ({ page }) => {
  await page.goto('/nlogin/login');
  await page.locator('#usernameField').fill(env.USER_NAME);
  await page.locator('#passwordField').fill(env.PASSWORD);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.waitForURL('**/homepage**');
  await page.context().storageState({ path: authFile });
});