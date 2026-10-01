import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class EditorPage extends BasePage {
  private readonly titleInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly articleBody: Locator;
  private readonly enterTagsInput: Locator;
  private readonly publishButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.locator("input[name='title']");
    this.descriptionInput = page.locator("input[name='description']");
    this.articleBody = page.locator("textarea[name='body']");
    this.enterTagsInput = page.locator("input[placeholder='Enter tags']");
    this.publishButton = page.getByRole('button', { name: /Publish Article/i });
    this.errorMessage = page.locator('.error-messages li');
  }

  async submitArticleForm(
    title: string,
    description: string,
    articleBody: string,
    tags: string,
  ): Promise<void> {
    await this.fill(this.titleInput, title);
    await this.fill(this.descriptionInput, description);
    await this.fill(this.articleBody, articleBody);
    await this.fill(this.enterTagsInput, tags);
    const submitArticleResponsePromise = this.page.waitForResponse((response) => {
      const pathname = new URL(response.url()).pathname;
      const segments = pathname.split('/').filter(Boolean);
      const method = response.request().method();
      const isCreate =
        segments[0] === 'api' &&
        segments[1] === 'articles' &&
        segments.length === 2 &&
        method === 'POST';
      const isUpdate =
        segments[0] === 'api' &&
        segments[1] === 'articles' &&
        segments.length === 3 &&
        (method === 'PUT' || method === 'PATCH');
      return isCreate || isUpdate;
    });
    await this.click(this.publishButton);
    await submitArticleResponsePromise;
    await this.page.waitForURL(/\/article\//);
  }

  async fillTitleInput(title: string): Promise<void> {
    await this.fill(this.titleInput, title);
  }

  async fillDescriptionInput(description: string): Promise<void> {
    await this.fill(this.descriptionInput, description);
  }

  async fillArticleBodyInput(articleBody: string): Promise<void> {
    await this.fill(this.articleBody, articleBody);
  }

  async fillTagsInput(tags: string): Promise<void> {
    await this.fill(this.enterTagsInput, tags);
  }

  async clickPublishButton(): Promise<void> {
    await this.click(this.publishButton);
  }

  async getArticleErrorMessage(): Promise<string[]> {
    await this.waitForVisible(this.errorMessage.first());
    return this.errorMessage.allInnerTexts();
  }

  async shouldSeeTitleInputValue(title: string): Promise<void> {
    await expect(this.titleInput).toHaveValue(title);
  }
}
