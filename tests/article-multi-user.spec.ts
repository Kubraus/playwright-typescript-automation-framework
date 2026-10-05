import { test, expect } from '../src/fixtures/test.fixture';
import { generateArticleData } from '../src/test-data/article.data';

test.describe.configure({ retries: 1 });

test(
  'Author can create and delete article visible to reader',
  { tag: '@smoke' },
  async ({ realWorld, articlesApi, authorUser, readerUser }) => {
    const article = generateArticleData();
    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      authorUser.token,
    );
    await articlesApi.waitUntilArticleExists(createdArticle.slug, readerUser.token);
    await realWorld.authenticateWithToken(readerUser.token);
    await realWorld.openArticleBySlug(createdArticle.slug);
    await realWorld.shouldSeeArticle(createdArticle.title);
    const deleteResponse = await articlesApi.deleteArticle(createdArticle.slug, authorUser.token);
    expect(deleteResponse.status()).toBe(204);

    const verifyDeletedResponse = await articlesApi.getArticle(
      createdArticle.slug,
      authorUser.token,
    );
    expect(verifyDeletedResponse.status()).toBe(404);
  },
);

test('Reader can favorite article created by author', async ({
  articlesApi,
  authorUser,
  readerUser,
}) => {
  const article = generateArticleData();
  const createdArticle = await articlesApi.createArticleAndReturnData(
    article.title,
    article.description,
    article.articleBody,
    [article.tags],
    authorUser.token,
  );
  await articlesApi.waitUntilArticleExists(createdArticle.slug, readerUser.token);
  const favoriteArticle = await articlesApi.favoriteArticleAndReturnData(
    createdArticle.slug,
    readerUser.token,
  );
  expect(favoriteArticle.favorited).toBe(true);
  expect(favoriteArticle.favoritesCount).toBe(1);
  const fetchedArticle = await articlesApi.getArticleAndReturnData(
    createdArticle.slug,
    authorUser.token,
  );
  expect(fetchedArticle.favoritesCount).toBe(1);

  const deleteResponse = await articlesApi.deleteArticle(createdArticle.slug, authorUser.token);
  expect(deleteResponse.status()).toBe(204);

  const verifyDeleteResponse = await articlesApi.getArticle(createdArticle.slug, authorUser.token);
  expect(verifyDeleteResponse.status()).toBe(404);
});

test('Reader can add comment to article created by author', async ({
  realWorld,
  articlesApi,
  authorUser,
  readerUser,
}) => {
  let createdArticleSlug: string | undefined;
  const comment = 'This is my first UI comment';
  const article = generateArticleData();
  try {
    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      authorUser.token,
    );
    await articlesApi.waitUntilArticleExists(createdArticle.slug, readerUser.token);
    createdArticleSlug = createdArticle.slug;
    await realWorld.authenticateWithToken(readerUser.token);
    await realWorld.openArticleBySlug(createdArticleSlug);
    await realWorld.shouldSeeArticle(createdArticle.title);
    await realWorld.addComment(comment);
    await realWorld.shouldSeeComment(comment);
  } finally {
    if (createdArticleSlug) {
      await articlesApi.deleteArticle(createdArticleSlug, authorUser.token);
    }
  }
});

test('Reader can delete own comment from article', async ({
  realWorld,
  articlesApi,
  authorUser,
  readerUser,
}) => {
  let createdArticleSlug: string | undefined;
  const comment = `Comment to delete ${Date.now()}`;
  const article = generateArticleData();
  try {
    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      authorUser.token,
    );
    await articlesApi.waitUntilArticleExists(createdArticle.slug, readerUser.token);
    createdArticleSlug = createdArticle.slug;
    await realWorld.authenticateWithToken(readerUser.token);
    await realWorld.openArticleBySlug(createdArticleSlug);
    await realWorld.shouldSeeArticle(createdArticle.title);
    await realWorld.addComment(comment);
    await realWorld.shouldSeeComment(comment);
    await realWorld.deleteComment(comment);
    await realWorld.shouldNotSeeComment(comment);
  } finally {
    if (createdArticleSlug) {
      await articlesApi.deleteArticle(createdArticleSlug, authorUser.token);
    }
  }
});

test('Reader should see multiple comments on article', async ({
  realWorld,
  articlesApi,
  authorUser,
  readerUser,
}) => {
  let createdArticleSlug: string | undefined;
  const firstComment = `First comment ${Date.now()}`;
  const secondComment = `Second comment ${Date.now()}`;
  const article = generateArticleData();
  try {
    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      authorUser.token,
    );
    await articlesApi.waitUntilArticleExists(createdArticle.slug, readerUser.token);
    createdArticleSlug = createdArticle.slug;
    await realWorld.authenticateWithToken(readerUser.token);
    await realWorld.openArticleBySlug(createdArticleSlug);
    await realWorld.shouldSeeArticle(createdArticle.title);
    await realWorld.addComment(firstComment);
    await realWorld.shouldSeeComment(firstComment);
    await realWorld.addComment(secondComment);
    await realWorld.shouldSeeComment(secondComment);
  } finally {
    if (createdArticleSlug) {
      await articlesApi.deleteArticle(createdArticleSlug, authorUser.token);
    }
  }
});
