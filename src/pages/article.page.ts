import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  private readonly articleTitle: Locator;
  private readonly editArticle: Locator;
  private readonly deleteArticle: Locator;
  private readonly commentInput: Locator;
  private readonly postCommentButton: Locator;
  private readonly commentText: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.editArticle = page.getByRole('link', { name: /Edit Article/i }).first();
    this.deleteArticle = page.getByRole('button', { name: /Delete Article/i }).first();
    this.commentInput = page.locator("[placeholder='Write a comment...']");
    this.postCommentButton = page.getByRole('button', { name: /Post Comment/i });
    this.commentText = page.locator('.card-block .card-text');
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
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentSlug(): Promise<string> {
    return this.page.url().split('/').pop()!;
  }

  async addComment(comment: string): Promise<void> {
    await this.fill(this.commentInput, comment);
    await this.click(this.postCommentButton);
  }

  getCommentText(): Locator {
    return this.commentText;
  }
}
