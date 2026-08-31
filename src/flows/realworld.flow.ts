import { HomePage } from '../pages/home.page';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HeaderComponent } from '../components/header.component';
import { EditorPage } from '../pages/editor.page';
import { ArticlePage } from '../pages/article.page';
import { SignUpPage } from '../pages/signUp.page';
import { ProfilePage } from '../pages/profile.page';

export class RealWorldFlow {
  constructor(
    private readonly homePage: HomePage,
    private readonly loginPage: LoginPage,
    private readonly headerComponent: HeaderComponent,
    private readonly editorPage: EditorPage,
    private readonly articlePage: ArticlePage,
    private readonly signUpPage: SignUpPage,
    private readonly profilePage: ProfilePage,
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
    await expect(this.articlePage.getCommentByText(comment)).toBeVisible();
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

  async fillArticleTitle(title: string): Promise<void> {
    await this.editorPage.fillTitleInput(title);
  }

  async fillArticleDescription(description: string): Promise<void> {
    await this.editorPage.fillDescriptionInput(description);
  }

  async fillArticleBody(articleBody: string): Promise<void> {
    await this.editorPage.fillArticleBodyInput(articleBody);
  }

  async fillArticleTags(articleTags: string): Promise<void> {
    await this.editorPage.fillTagsInput(articleTags);
  }

  async submitPublishArticle(): Promise<void> {
    await this.editorPage.clickPublishButton();
  }

  async getArticleErrorMessage(): Promise<string> {
    return this.editorPage.getArticleErrorMessage();
  }

  async getFirstAuthorName(): Promise<string> {
    return this.homePage.getAuthorName();
  }

  async openFirstAuthorProfile(): Promise<void> {
    await this.homePage.clickFirstAuthor();
  }

  async shouldSeeProfileAuthorName(expectedName: string): Promise<void> {
    await expect(this.profilePage.getAuthorName()).toHaveText(expectedName);
  }

  async shouldSeeMyPostsTab(): Promise<void> {
    await expect(this.profilePage.getMyPostsTab()).toBeVisible();
    await expect(this.profilePage.getMyPostsTab()).toHaveClass(/active/);
  }

  async shouldArticlesListNotBeEmpty(): Promise<void> {
    await expect.poll(async () => this.profilePage.getArticlesList().count()).toBeGreaterThan(0);
  }

  async clickFollowButton(): Promise<void> {
    await this.profilePage.clickFollow();
  }

  async clickUnfollowButton(): Promise<void> {
    await this.profilePage.clickUnfollow();
  }

  async shouldSeeUnfollowButton(authorName: string): Promise<void> {
    await expect(this.profilePage.getUnfollowButton()).toHaveText(`Unfollow ${authorName}`);
  }

  async shouldSeeFollowButton(authorName: string): Promise<void> {
    await expect(this.profilePage.getFollowButton()).toHaveText(`Follow ${authorName}`);
  }

  async shouldSeeLoginPage(): Promise<void> {
    await this.loginPage.shouldBeOnLoginPage();
  }

  async openFavoritedPosts(): Promise<void> {
    await this.profilePage.clickFavoritedPostsTab();
  }

  async shouldSeeFavoritedPostsTab(): Promise<void> {
    await expect(this.profilePage.getFavoritedPostsTab()).toBeVisible();
    await expect(this.profilePage.getFavoritedPostsTab()).toHaveClass(/active/);
  }

  async shouldSeeArticleWithTitle(title: string): Promise<void> {
    await expect(this.profilePage.getArticleTitleLocator(title)).toBeVisible();
  }

  async shouldNotSeeArticleWithTitle(title: string): Promise<void> {
    await expect(this.profilePage.getArticleTitleLocator(title)).not.toBeVisible();
  }

  async clickFavoriteButtonOnTheFirstArticle(): Promise<void> {
    await this.homePage.clickFirstArticleFavoriteButton();
  }

  async getFirstArticleTitle(): Promise<string> {
    return this.homePage.getFirstArticleTitle();
  }

  async openUserProfile(username: string): Promise<void> {
    await this.profilePage.openProfile(username);
  }

  async shouldFirstArticleBeFavorited(): Promise<void> {
    await expect(this.homePage.getFirstArticleFavoriteButton()).toHaveClass(/btn-primary/);
  }

  async shouldFirstArticleNotBeFavorited(): Promise<void> {
    await expect(this.homePage.getFirstArticleFavoriteButton()).toHaveClass(/btn-outline-primary/);
  }

  async deleteComment(comment: string): Promise<void> {
    await this.articlePage.deleteComment(comment);
  }

  async shouldNotSeeComment(comment: string): Promise<void> {
    await expect(this.articlePage.getCommentByText(comment)).not.toBeVisible();
  }
}
