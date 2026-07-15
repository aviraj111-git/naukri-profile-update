import { test, expect } from '@playwright/test';

test('Update Naukri Profile', async ({ page }) => {
  await page.goto('/mnjuser/homepage');

  const profileName = page.getByText('Avinash Kumar');
  await expect(profileName).toBeVisible();
  
  // Navigate to profile
  await page.getByRole('img', { name: 'naukri user profile img' }).click();
  await page.waitForTimeout(500);
  await page.getByText('View & edit profile').click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Click edit employment
  await page.locator('#profile-section-employment').getByRole('img', { name: 'DotsThreeVertical' }).click();
  await page.waitForTimeout(500);
  await page.getByText('Edit employment').click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Fill the job description
  const textarea = page.locator('textarea[name="jobDescription"]');
  await textarea.waitFor({ state: 'visible', timeout: 10000 });
  let inputData = await textarea.textContent();
  inputData = inputData == null ? "Automation": inputData.replace(/\d{1,2}\/\d{1,2}\/\d{4},\s*\d{1,2}:\d{2}:\d{2}\s*[ap]m/gi, '');
  const now: Date = new Date();
  await textarea.fill(inputData.concat(now.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  })));
  
  
  // Click save
  const saveButton = page.getByRole('button', { name: 'Save Saved Check' });
  await saveButton.click({ force: true, timeout: 5000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Close any open modals/drawers
  const drawerOverlay = page.locator('.drawer-overlay');
  if (await drawerOverlay.isVisible()) {
    await drawerOverlay.click();
    await page.waitForTimeout(500);
  }
  
  // Logout
  await page.getByRole('img', { name: 'naukri user profile img' }).click();
  await page.waitForTimeout(500);
  await page.getByText('Logout').click();
});

