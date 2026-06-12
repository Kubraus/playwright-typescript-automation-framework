import { test, expect } from '../src/fixtures/test.fixture';
import { ArticlesApi } from '../src/api/articles.api';
import { generateArticleData } from '../src/test-data/article.data';

test('User can manage article created by API', async ({ realWorld, request, apiUser }) => {
  const article = generateArticleData();
  const updatedArticle = generateArticleData();
  const articleApi = new ArticlesApi(request);
  await realWorld.authenticateWithToken(apiUser.token);
  const createdArticle = await articleApi.createArticleAndReturnData(
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
  const fetchedArticle = await articleApi.getArticleAndReturnData(updatedSlug, apiUser.token);
  expect(fetchedArticle.title).toBe(updatedArticle.title);

  const deleteResponse = await articleApi.deleteArticle(updatedSlug, apiUser.token);
  expect(deleteResponse.status()).toBe(204);

  const verifyDeletedResponse = await articleApi.getArticle(updatedSlug, apiUser.token);
  expect(verifyDeletedResponse.status()).toBe(404);
});
