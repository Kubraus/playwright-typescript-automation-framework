import { test, expect } from '@playwright/test';
import { env } from '../src/config/env';

test('Home page should be opened', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(`${env.BASE_URL}/`);
  await expect(page).toHaveTitle(/Conduit/);
});
