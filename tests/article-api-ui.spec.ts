import { test, expect } from '../src/fixtures/test.fixture';
import { generateArticleData } from '../src/test-data/article.data';

test('Article created by API is visible in UI', async ({ realWorld, articlesApi, apiUser }) => {
  const article = generateArticleData();
  await realWorld.authenticateWithToken(apiUser.token);
  const createdArticle = await articlesApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    apiUser.token,
  );
  const fetchedArticle = await articlesApi.getArticleAndReturnData(
    createdArticle.slug,
    apiUser.token,
  );
  expect(fetchedArticle.title).toBe(createdArticle.title);
  await realWorld.openArticleBySlug(createdArticle.slug);
  await realWorld.shouldSeeArticle(createdArticle.title);
});

test('Article created in UI is available by API', async ({ realWorld, articlesApi, apiUser }) => {
  const article = generateArticleData();
  await realWorld.authenticateWithToken(apiUser.token);
  await realWorld.openNewArticleEditor();
  await realWorld.createArticle(
    article.title,
    article.description,
    article.articleBody,
    article.tags,
  );
  await realWorld.shouldSeeArticle(article.title);
  const slug = await realWorld.getCurrentArticleSlug();
  const fetchedArticle = await articlesApi.getArticleAndReturnData(slug, apiUser.token);
  expect(fetchedArticle.title).toBe(article.title);
  expect(fetchedArticle.description).toBe(article.description);
  expect(fetchedArticle.body).toBe(article.articleBody);
  expect(fetchedArticle.tagList).toContain(article.tags);
  const deleteResponse = await articlesApi.deleteArticle(slug, apiUser.token);
  expect(deleteResponse.status()).toBe(204);
  const verifyDeleteResponse = await articlesApi.getArticle(slug, apiUser.token);
  expect(verifyDeleteResponse.status()).toBe(404);
});
