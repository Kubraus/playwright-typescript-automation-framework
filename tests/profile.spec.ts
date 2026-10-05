import { test } from '../src/fixtures/test.fixture';

test('Should display author posts on profile', async ({ realWorld }) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
  const authorName = await realWorld.getFirstAuthorName();
  await realWorld.openFirstAuthorProfile();
  await realWorld.shouldSeeProfileAuthorName(authorName);
  await realWorld.shouldSeeMyPostsTab();
  await realWorld.shouldArticlesListNotBeEmpty();
});

test('Should follow another user', async ({ realWorld, readerUser }) => {
  await realWorld.authenticateWithToken(readerUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  const authorName = await realWorld.getFirstAuthorName();
  await realWorld.openFirstAuthorProfile();
  await realWorld.shouldSeeProfileAuthorName(authorName);
  await realWorld.clickFollowButton();
  await realWorld.shouldSeeUnfollowButton(authorName);
});

test('Should unfollow another user', async ({ realWorld, readerUser }) => {
  await realWorld.authenticateWithToken(readerUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  const authorName = await realWorld.getFirstAuthorName();
  await realWorld.openFirstAuthorProfile();
  await realWorld.shouldSeeProfileAuthorName(authorName);
  await realWorld.clickFollowButton();
  await realWorld.shouldSeeUnfollowButton(authorName);
  await realWorld.clickUnfollowButton();
  await realWorld.shouldSeeFollowButton(authorName);
});

test('Should redirect unauthenticated user to login when following author', async ({
  realWorld,
}) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
  const authorName = await realWorld.getFirstAuthorName();
  await realWorld.openFirstAuthorProfile();
  await realWorld.shouldSeeProfileAuthorName(authorName);
  await realWorld.clickFollowButton();
  await realWorld.shouldSeeLoginPage();
});

test('Should display favorite posts on author profile', async ({ realWorld }) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
  const authorName = await realWorld.getFirstAuthorName();
  await realWorld.openFirstAuthorProfile();
  await realWorld.shouldSeeProfileAuthorName(authorName);
  await realWorld.openFavoritedPosts();
  await realWorld.shouldSeeFavoritedPostsTab();
  await realWorld.shouldArticlesListNotBeEmpty();
});

test('Should display favorited article on user profile', async ({ realWorld, readerUser }) => {
  await realWorld.authenticateWithToken(readerUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  const articleTitle = await realWorld.getFirstArticleTitle();
  await realWorld.clickFavoriteButtonOnTheFirstArticle();
  await realWorld.shouldFirstArticleBeFavorited();
  await realWorld.openUserProfile(readerUser.username);
  await realWorld.openFavoritedPosts();
  await realWorld.shouldSeeFavoritedPostsTab();
  await realWorld.shouldSeeArticleWithTitle(articleTitle);
});

test('Should remove favorited article from user profile', async ({ realWorld, readerUser }) => {
  await realWorld.authenticateWithToken(readerUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  const articleTitle = await realWorld.getFirstArticleTitle();
  await realWorld.clickFavoriteButtonOnTheFirstArticle();
  await realWorld.shouldFirstArticleBeFavorited();
  await realWorld.clickFavoriteButtonOnTheFirstArticle();
  await realWorld.shouldFirstArticleNotBeFavorited();
  await realWorld.openUserProfile(readerUser.username);
  await realWorld.openFavoritedPosts();
  await realWorld.shouldSeeFavoritedPostsTab();
  await realWorld.shouldNotSeeArticleWithTitle(articleTitle);
});
