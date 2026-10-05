import { test, expect } from '../src/fixtures/test.fixture';
import { generateArticleData } from '../src/test-data/article.data';

test('User can manage article created by API', async ({ realWorld, articlesApi, apiUser }) => {
  const article = generateArticleData();
  const updatedArticle = generateArticleData();
  await realWorld.authenticateWithToken(apiUser.token);
  const createdArticle = await articlesApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    apiUser.token,
  );
  await realWorld.openArticleBySlug(createdArticle.slug);
  await realWorld.shouldSeeArticle(createdArticle.title);
  await realWorld.openEditArticlePage();
  await realWorld.shouldSeeEditorTitleValue(createdArticle.title);
  await realWorld.updateArticle(
    updatedArticle.title,
    updatedArticle.description,
    updatedArticle.articleBody,
    updatedArticle.tags,
  );
  await realWorld.shouldSeeArticle(updatedArticle.title);
  const updatedSlug = await realWorld.getCurrentArticleSlug();
  const fetchedArticle = await articlesApi.getArticleAndReturnData(updatedSlug, apiUser.token);
  expect(fetchedArticle.title).toBe(updatedArticle.title);

  const deleteResponse = await articlesApi.deleteArticle(updatedSlug, apiUser.token);
  expect(deleteResponse.status()).toBe(204);

  const verifyDeletedResponse = await articlesApi.getArticle(updatedSlug, apiUser.token);
  expect(verifyDeletedResponse.status()).toBe(404);
});
