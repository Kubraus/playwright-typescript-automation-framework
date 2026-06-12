import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  private readonly articleTitle: Locator;
  private readonly editArticle: Locator;
  private readonly deleteArticle: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.editArticle = page.getByRole('link', { name: /Edit Article/i }).first();
    this.deleteArticle = page.getByRole('button', { name: /Delete Article/i }).first();
  }

  getArticleTitle(): Locator {
    return this.articleTitle;
  }

  getEditArticleButton(): Locator {
    return this.editArticle;
  }

  async clickEditArticle(): Promise<void> {
    await this.click(this.editArticle);
    await this.page.waitForURL(/\/editor\//);
  }

  async clickDeleteArticle(): Promise<void> {
    await this.click(this.deleteArticle);
    await this.page.waitForURL('/');
  }

  async openArticleBySlug(slug: string): Promise<void> {
    await this.page.goto(`/article/${slug}`);
  }

  async getCurrentSlug(): Promise<string> {
    return this.page.url().split('/').pop()!;
  }
}
