import { test, expect, Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected async setLocalStorageItem(key: string, value: string): Promise<void> {
    await test.step(`Setting ${key}`, async () => {
      await this.page.evaluate(
        ({ key, value }) => {
          localStorage.setItem(key, value);
        },
        { key, value },
      );
    });
  }

  protected getLocalStorageItem(key: string): Promise<string | null> {
    return this.page.evaluate((key) => localStorage.getItem(key), key);
  }

  protected async waitForVisible(locator: Locator): Promise<void> {
    await test.step('Wait for element to be visible', async () => {
      await expect(locator).toBeVisible();
    });
  }

  protected click(locator: Locator): Promise<void> {
    return test.step('Click element', () => locator.click());
  }

  protected fill(locator: Locator, text: string): Promise<void> {
    return test.step('Fill element', () => locator.fill(text));
  }

  protected async getText(locator: Locator): Promise<string> {
    return test.step(`Get text from element ${locator}`, async () => {
      await this.waitForVisible(locator);
      return locator.innerText();
    });
  }

  protected async reloadPage(): Promise<void> {
    await this.page.reload();
  }
}
