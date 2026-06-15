import { test, expect } from '../src/fixtures/test.fixture';
import { generateArticleData } from '../src/test-data/article.data';
import { ArticlesApi } from '../src/api/articles.api';

test('Author can create and delete article visible to reader', async ({
  realWorld,
  request,
  authorUser,
  readerUser,
}) => {
  const article = generateArticleData();
  const articleApi = new ArticlesApi(request);
  const createdArticle = await articleApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    authorUser.token,
  );
  await realWorld.authenticateWithToken(readerUser.token);
  await realWorld.openArticleBySlug(createdArticle.slug);
  await realWorld.shouldSeeArticle(createdArticle.title);
  const deleteResponse = await articleApi.deleteArticle(createdArticle.slug, authorUser.token);
  expect(deleteResponse.status()).toBe(204);

  const verifyDeletedResponse = await articleApi.getArticle(createdArticle.slug, authorUser.token);
  expect(verifyDeletedResponse.status()).toBe(404);
});

test('Reader can favorite article created by author', async ({
  request,
  authorUser,
  readerUser,
}) => {
  const article = generateArticleData();
  const articleApi = new ArticlesApi(request);
  const createdArticle = await articleApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    authorUser.token,
  );
  const favoriteArticle = await articleApi.favoriteArticleAndReturnData(
    createdArticle.slug,
    readerUser.token,
  );
  expect(favoriteArticle.favorited).toBe(true);
  expect(favoriteArticle.favoritesCount).toBe(1);
  const fetchedArticle = await articleApi.getArticleAndReturnData(
    createdArticle.slug,
    authorUser.token,
  );
  expect(fetchedArticle.favoritesCount).toBe(1);

  const deleteResponse = await articleApi.deleteArticle(createdArticle.slug, authorUser.token);
  expect(deleteResponse.status()).toBe(204);

  const verifyDeleteResponse = await articleApi.getArticle(createdArticle.slug, authorUser.token);
  expect(verifyDeleteResponse.status()).toBe(404);
});

test('Reader can add comment to article created by author', async ({
  realWorld,
  request,
  authorUser,
  readerUser,
}) => {
  const comment = 'This is my first UI comment';
  const article = generateArticleData();
  const articleApi = new ArticlesApi(request);
  const createdArticle = await articleApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    authorUser.token,
  );
  await realWorld.authenticateWithToken(readerUser.token);
  await realWorld.openArticleBySlug(createdArticle.slug);
  await realWorld.shouldSeeArticle(createdArticle.title);
  await realWorld.addComment(comment);
  await realWorld.shouldSeeComment(comment);

  const deleteResponse = await articleApi.deleteArticle(createdArticle.slug, authorUser.token);
  expect(deleteResponse.status()).toBe(204);

  const verifyDeleteResponse = await articleApi.getArticle(createdArticle.slug, authorUser.token);
  expect(verifyDeleteResponse.status()).toBe(404);
});
