import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SettingsPage extends BasePage {
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async clickLogout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  getLogoutButton(): Locator {
    return this.logoutButton;
  }
}
