import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ProfilePage extends BasePage {
  private readonly authorName: Locator;
  private readonly followButton: Locator;
  private readonly unfollowButton: Locator;
  private readonly favoritedPostsTab: Locator;
  private readonly myPostsTab: Locator;
  private readonly articlesList: Locator;

  constructor(page: Page) {
    super(page);
    this.authorName = page.locator('.user-info h4');
    this.followButton = page.getByRole('button', { name: /Follow/i });
    this.unfollowButton = page.getByRole('button', { name: /Unfollow/i });
    this.favoritedPostsTab = page.getByRole('link', { name: /Favorited Posts/i });
    this.myPostsTab = page.getByRole('link', { name: /My Posts/i });
    this.articlesList = page.locator('.preview-link');
  }

  async clickFollow(): Promise<void> {
    await this.click(this.followButton);
  }

  async clickUnfollow(): Promise<void> {
    await this.click(this.unfollowButton);
  }

  getAuthorName(): Locator {
    return this.authorName;
  }

  getFollowButton(): Locator {
    return this.followButton;
  }

  getUnfollowButton(): Locator {
    return this.unfollowButton;
  }

  getMyPostsTab(): Locator {
    return this.myPostsTab;
  }

  getArticlesList(): Locator {
    return this.articlesList;
  }

  async clickFavoritedPostsTab(): Promise<void> {
    await this.click(this.favoritedPostsTab);
  }

  getFavoritedPostsTab(): Locator {
    return this.favoritedPostsTab;
  }

  getArticleTitle(title: string): Locator {
    return this.articlesList.getByRole('heading', { name: title });
  }

  async openProfile(username: string): Promise<void> {
    await this.page.goto(`/profile/${username}`);
    await this.waitForVisible(this.authorName);
  }
}
