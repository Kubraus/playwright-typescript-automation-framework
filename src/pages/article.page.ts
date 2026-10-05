import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  private readonly articleTitle: Locator;
  private readonly editArticle: Locator;
  private readonly deleteArticle: Locator;
  private readonly commentInput: Locator;
  private readonly postCommentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.editArticle = page.getByRole('link', { name: /Edit Article/i }).first();
    this.deleteArticle = page.getByRole('button', { name: /Delete Article/i }).first();
    this.commentInput = page.locator("[placeholder='Write a comment...']");
    this.postCommentButton = page.getByRole('button', { name: /Post Comment/i });
  }

  getArticleTitle(): Locator {
    return this.articleTitle;
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
    const articleResponsePromise = this.page.waitForResponse((response) => {
      const pathname = new URL(response.url()).pathname;
      const segments = pathname.split('/').filter(Boolean);
      const method = response.request().method();
      return (
        segments[0] === 'api' &&
        segments[1] === 'articles' &&
        segments[2] === slug &&
        segments.length === 3 &&
        method === 'GET'
      );
    });
    await this.page.goto(`/article/${slug}`);
    const response = await articleResponsePromise;

    if (response.status() !== 200) {
      const responseBodyText = await response.text();
      throw new Error(`Article request failed with status ${response.status()} for slug: ${slug}
      Response body: ${responseBodyText}`);
    }
  }

  async getCurrentSlug(): Promise<string> {
    const pathname = new URL(this.page.url()).pathname;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] !== 'article' || segments.length !== 2) {
      throw new Error(`Unable to extract article slug from URL: ${this.page.url()}`);
    }
    return segments[1];
  }

  async addComment(comment: string): Promise<void> {
    await this.fill(this.commentInput, comment);
    await this.click(this.postCommentButton);
  }

  getCommentByText(comment: string): Locator {
    return this.page.locator('.card').filter({
      has: this.page.locator('.card-text', { hasText: comment }),
    });
  }

  async deleteComment(comment: string): Promise<void> {
    const commentCard = this.getCommentByText(comment);
    const deleteButton = commentCard.locator('.ion-trash-a');
    await this.click(deleteButton);
  }
}
