import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly navbarBrand: Locator;
  private readonly signIn: Locator;
  private readonly signUp: Locator;
  private readonly authorName: Locator;
  private readonly firstArticleCard: Locator;
  private readonly firstArticleTitle: Locator;
  private readonly firstFavoriteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navbarBrand = page.locator('.navbar-brand');
    this.signIn = page.locator('a[href="/login"]');
    this.signUp = page.locator('a[href="/register"]');
    this.authorName = page.locator('.author').first();
    this.firstArticleCard = page.locator('.article-preview').first();
    this.firstArticleTitle = this.firstArticleCard.locator('.preview-link h1');
    this.firstFavoriteButton = this.firstArticleCard.locator('button');
  }

  async setJwtToken(token: string): Promise<void> {
    await this.setLocalStorageItem('jwtToken', token);
  }

  async shouldHaveJwtToken(expectedToken: string): Promise<void> {
    await expect.poll(async () => this.getLocalStorageItem('jwtToken')).toBe(expectedToken);
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signIn);
  }

  async clickSignUp(): Promise<void> {
    await this.click(this.signUp);
  }

  getNavbarBrand(): Locator {
    return this.navbarBrand;
  }

  getSignInLink(): Locator {
    return this.signIn;
  }

  getSignUpLink(): Locator {
    return this.signUp;
  }

  async reload(): Promise<void> {
    await this.reloadPage();
  }

  async clickFirstAuthor(): Promise<void> {
    await this.click(this.authorName);
  }

  getAuthorName(): Promise<string> {
    return this.authorName.innerText();
  }

  async getFirstArticleTitle(): Promise<string> {
    return await this.getText(this.firstArticleTitle);
  }

  async clickFirstArticleFavoriteButton(): Promise<void> {
    await this.click(this.firstFavoriteButton);
  }
}
