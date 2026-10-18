import { test, expect } from '@playwright/test';

test('should open a new tab using page popup event', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  const popUpPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: `Click Here` }).click();
  const popUp = await popUpPromise;

  await expect(popUp.getByRole('heading', { name: 'New Window' })).toBeVisible();
});

test('should open a new tab using browser context page event', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  const newPagePromise = context.waitForEvent('page');
  await page.getByRole('link', { name: 'Click Here' }).click();
  const newPage = await newPagePromise;

  await expect(newPage.getByRole('heading', { name: 'New Window' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();
});
