import { BasePage } from '../pages/base.page';
import { Locator, Page } from '@playwright/test';

export class HeaderComponent extends BasePage {
  private readonly settingsLink: Locator;
  private readonly newArticleLink: Locator;

  constructor(page: Page) {
    super(page);
    this.settingsLink = page.getByRole('link', { name: /Settings/i });
    this.newArticleLink = page.getByRole('link', { name: /New Article/i });
  }

  getSettingsLink(): Locator {
    return this.settingsLink;
  }

  getNewArticleLink(): Locator {
    return this.newArticleLink;
  }

  async clickNewArticleLink(): Promise<void> {
    await this.click(this.newArticleLink);
  }

  async clickSettingsLink(): Promise<void> {
    await this.click(this.settingsLink);
  }
}
