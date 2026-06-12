import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class EditorPage extends BasePage {
  private readonly titleInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly articleBody: Locator;
  private readonly enterTagsInput: Locator;
  private readonly publishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.locator("input[name='title']");
    this.descriptionInput = page.locator("input[name='description']");
    this.articleBody = page.locator("textarea[name='body']");
    this.enterTagsInput = page.locator("input[placeholder='Enter tags']");
    this.publishButton = page.getByRole('button', { name: /Publish Article/i });
  }

  async createArticle(
    title: string,
    description: string,
    articleBody: string,
    tags: string,
  ): Promise<void> {
    await this.clearAndFill(this.titleInput, title);
    await this.clearAndFill(this.descriptionInput, description);
    await this.clearAndFill(this.articleBody, articleBody);
    await this.clearAndFill(this.enterTagsInput, tags);
    const createArticleResponsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/articles') &&
        ['POST', 'PUT', 'PATCH'].includes(response.request().method()),
    );
    await this.click(this.publishButton);
    await createArticleResponsePromise;
    await this.page.waitForURL(/\/article\//);
  }

  async updateArticle(
    title: string,
    description: string,
    articleBody: string,
    tags: string,
  ): Promise<void> {
    await this.createArticle(title, description, articleBody, tags);
  }

  async shouldSeeTitleInputValue(title: string): Promise<void> {
    await expect(this.titleInput).toHaveValue(title);
  }
}
