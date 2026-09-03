import { test } from '../src/fixtures/test.fixture';

test('Elements should be visible on the Home Page', async ({ realWorld }) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
});

test('Should open article from Global Feed', async ({ realWorld }) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
  const articleTitle = await realWorld.getFirstArticleTitle();
  await realWorld.openFirstArticle();
  await realWorld.shouldSeeArticle(articleTitle);
});

test('Should display authenticated Home Page', async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
});

test('Should redirect unauthenticated user to sign up when favoriting article', async ({
  realWorld,
}) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
  await realWorld.clickFavoriteButtonOnTheFirstArticle();
  await realWorld.shouldSeeSignUpPage();
});

test('Should switch from Global Feed to Your Feed', async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  await realWorld.shouldSeeGlobalFeedTab();
  await realWorld.shouldGlobalFeedTabBeActive();
  await realWorld.shouldSeeYourFeedTab();
  await realWorld.openYourFeedTab();
  await realWorld.shouldYourFeedTabBeActive();
});

test('Should switch from Your Feed back to Global Feed', async ({realWorld, apiUser}) => {
  await realWorld.authenticateWithToken(apiUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  await realWorld.shouldSeeGlobalFeedTab();
  await realWorld.shouldGlobalFeedTabBeActive();
  await realWorld.shouldSeeYourFeedTab();
  await realWorld.openYourFeedTab();
  await realWorld.shouldYourFeedTabBeActive();
  await realWorld.shouldSeeGlobalFeedTab();
  await realWorld.openGlobalFeedTab();
  await realWorld.shouldGlobalFeedTabBeActive();
});
