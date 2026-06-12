import { test, expect, Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected async setLocalStorageItem(key: string, value: string) {
    await test.step(`Setting ${key} with value: ${value}`, async () => {
      await this.page.evaluate(
        ({ key, value }) => {
          localStorage.setItem(key, value);
        },
        { key, value },
      );
    });
  }

  protected async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate((key) => localStorage.getItem(key), key);
  }

  protected async waitForVisible(locator: Locator): Promise<void> {
    await test.step('Wait for element to be visible', async () => {
      await expect(locator).toBeVisible();
    });
  }

  protected async click(locator: Locator): Promise<void> {
    await test.step('Click element', async () => {
      await this.waitForVisible(locator);
      await locator.click();
    });
  }

  protected async fill(locator: Locator, text: string): Promise<void> {
    await test.step('Fill element', async () => {
      await this.waitForVisible(locator);
      await locator.fill(text);
    });
  }

  protected async clearAndFill(locator: Locator, text: string): Promise<void> {
    await test.step('Clear element and fill', async () => {
      await this.waitForVisible(locator);
      await locator.clear();
      await locator.fill(text);
    });
  }

  protected async getText(locator: Locator): Promise<string> {
    return await test.step(`Get text from element ${locator}`, async () => {
      await this.waitForVisible(locator);
      return await locator.innerText();
    });
  }

  protected async reloadPage(): Promise<void> {
    await this.page.reload();
  }
}
