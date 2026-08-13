import { HomePage } from '../pages/home.page';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HeaderComponent } from '../components/header.component';
import { EditorPage } from '../pages/editor.page';
import { ArticlePage } from '../pages/article.page';
import { SignUpPage } from '../pages/signUp.page';

export class RealWorldFlow {
  constructor(
    private readonly homePage: HomePage,
    private readonly loginPage: LoginPage,
    private readonly headerComponent: HeaderComponent,
    private readonly editorPage: EditorPage,
    private readonly articlePage: ArticlePage,
    private readonly signUpPage: SignUpPage,
  ) {}

  async openHomePage(): Promise<void> {
    await this.homePage.open();
  }

  async authenticateWithToken(token: string): Promise<void> {
    await this.openHomePage();
    await this.homePage.setJwtToken(token);
    await this.homePage.reload();
    await this.homePage.shouldHaveJwtToken(token);
    await this.shouldSeeSettingsLink();
  }

  async shouldSeeHomePage(): Promise<void> {
    await expect(this.homePage.getNavbarBrand()).toBeVisible();
    await expect(this.homePage.getSignInLink()).toBeVisible();
    await expect(this.homePage.getSignUpLink()).toBeVisible();
  }

  async shouldSeeAuthenticatedHomePage(): Promise<void> {
    await expect(this.homePage.getNavbarBrand()).toBeVisible();
    await expect(this.headerComponent.getNewArticleLink()).toBeVisible();
    await expect(this.headerComponent.getSettingsLink()).toBeVisible();
  }

  async openLoginPage(): Promise<void> {
    await this.loginPage.openLoginPage();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginPage.login(email, password);
  }

  async shouldSeeSettingsLink(): Promise<void> {
    await expect(this.headerComponent.getSettingsLink()).toBeVisible();
  }

  async openNewArticleEditor(): Promise<void> {
    await this.headerComponent.clickOnNewArticleLink();
  }

  async createArticle(
    title: string,
    description: string,
    articleBody: string,
    tags: string,
  ): Promise<void> {
    await this.editorPage.createArticle(title, description, articleBody, tags);
  }

  async shouldSeeArticle(title: string): Promise<void> {
    await expect(this.articlePage.getArticleTitle()).toContainText(title);
  }

  async openEditArticlePage(): Promise<void> {
    await this.articlePage.clickEditArticle();
  }

  async shouldSeeEditorTitleValue(title: string): Promise<void> {
    await this.editorPage.shouldSeeTitleInputValue(title);
  }

  async updateArticle(
    title: string,
    description: string,
    articleBody: string,
    tags: string,
  ): Promise<void> {
    await this.editorPage.updateArticle(title, description, articleBody, tags);
  }

  async deleteArticle(): Promise<void> {
    await this.articlePage.clickDeleteArticle();
  }

  async openArticleBySlug(slug: string): Promise<void> {
    await this.articlePage.openArticleBySlug(slug);
  }

  async getCurrentArticleSlug(): Promise<string> {
    return this.articlePage.getCurrentSlug();
  }

  async addComment(comment: string): Promise<void> {
    await this.articlePage.addComment(comment);
  }

  async shouldSeeComment(comment: string): Promise<void> {
    await expect(this.articlePage.getCommentText()).toContainText(comment);
  }

  async getLoginErrorMessage(): Promise<string> {
    return this.loginPage.getErrorMessage();
  }

  async enterLoginEmail(email: string): Promise<void> {
    await this.loginPage.fillEmail(email);
  }

  async enterLoginPassword(password: string): Promise<void> {
    await this.loginPage.fillPassword(password);
  }

  async shouldSeeSignInButtonDisabled(): Promise<void> {
    await expect(this.loginPage.getSignInButton()).toBeDisabled();
  }

  async openSignUpPage(): Promise<void> {
    await this.signUpPage.openSignUpPage();
  }

  async register(username: string, email: string, password: string): Promise<void> {
    await this.signUpPage.register(username, email, password);
  }

  async fillSignUpUsername(username: string): Promise<void> {
    await this.signUpPage.fillUsername(username);
  }

  async fillSignUpEmail(email: string): Promise<void> {
    await this.signUpPage.fillEmail(email);
  }

  async fillSignUpPassword(password: string): Promise<void> {
    await this.signUpPage.fillPassword(password);
  }

  async shouldSeeSignUpButtonDisabled(): Promise<void> {
    await expect(this.signUpPage.getSignUpButton()).toBeDisabled();
  }
}
