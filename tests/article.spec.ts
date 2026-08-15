import { generateArticleData } from '../src/test-data/article.data';
import { test, expect } from '../src/fixtures/test.fixture';

type ArticleData = ReturnType<typeof generateArticleData>;

let article: ArticleData;

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  await realWorld.openNewArticleEditor();
  article = generateArticleData();
});

test('Authenticated user can create article', async ({ realWorld }) => {
  await realWorld.createArticle(
    article.title,
    article.description,
    article.articleBody,
    article.tags,
  );
  await realWorld.shouldSeeArticle(article.title);
});

test('Authenticated user can edit created article', async ({ realWorld }) => {
  const originalArticle = article;
  const updatedArticle = generateArticleData();
  await realWorld.createArticle(
    originalArticle.title,
    originalArticle.description,
    originalArticle.articleBody,
    originalArticle.tags,
  );
  await realWorld.shouldSeeArticle(originalArticle.title);
  await realWorld.openEditArticlePage();
  await realWorld.shouldSeeEditorTitleValue(originalArticle.title);
  await realWorld.updateArticle(
    updatedArticle.title,
    updatedArticle.description,
    updatedArticle.articleBody,
    updatedArticle.tags,
  );
  await realWorld.shouldSeeArticle(updatedArticle.title);
});

test('Authenticated user can delete created article', async ({ realWorld }) => {
  await realWorld.createArticle(
    article.title,
    article.description,
    article.articleBody,
    article.tags,
  );
  await realWorld.shouldSeeArticle(article.title);
  await realWorld.deleteArticle();
  await realWorld.shouldSeeAuthenticatedHomePage();
});

test('Should reject article creation with empty title', async ({ realWorld }) => {
  await realWorld.fillArticleDescription(article.description);
  await realWorld.fillArticleBody(article.articleBody);
  await realWorld.fillArticleTags(article.tags);
  await realWorld.submitPublishArticle();
  expect(await realWorld.getArticleErrorMessage()).toContain("title can't be blank");
});

test('Should reject article creation with empty description', async ({ realWorld }) => {
  await realWorld.fillArticleTitle(article.title);
  await realWorld.fillArticleBody(article.articleBody);
  await realWorld.fillArticleTags(article.tags);
  await realWorld.submitPublishArticle();
  expect(await realWorld.getArticleErrorMessage()).toContain("description can't be blank");
});

test('Should reject article creation with empty body', async ({ realWorld }) => {
  await realWorld.fillArticleDescription(article.description);
  await realWorld.fillArticleTitle(article.title);
  await realWorld.fillArticleTags(article.tags);
  await realWorld.submitPublishArticle();
  expect(await realWorld.getArticleErrorMessage()).toContain("body can't be blank");
});
