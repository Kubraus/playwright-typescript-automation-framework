import { test, expect } from '../src/fixtures/test.fixture';
import { ArticlesApi } from '../src/api/articles.api';
import { generateArticleData } from '../src/test-data/article.data';

test('Article created by API is visible in UI', async ({ realWorld, request, apiUser }) => {
  const article = generateArticleData();
  const articleApi = new ArticlesApi(request);
  await realWorld.authenticateWithToken(apiUser.token);
  const createdArticle = await articleApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    apiUser.token,
  );
  const fetchedArticle = await articleApi.getArticleAndReturnData(
    createdArticle.slug,
    apiUser.token,
  );
  expect(fetchedArticle.title).toBe(createdArticle.title);
  await realWorld.openArticleBySlug(createdArticle.slug);
  await realWorld.shouldSeeArticle(createdArticle.title);
});
