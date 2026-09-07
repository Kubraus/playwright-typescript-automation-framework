import { test, expect } from '../../src/fixtures/test.fixture';
import { generateArticleData } from '../../src/test-data/article.data';

type ArticleData = ReturnType<typeof generateArticleData>;

const articleValidationCases = [
  {
    field: 'title',
    prepareData: (article: ArticleData) => ({
      title: '',
      description: article.description,
      body: article.articleBody,
    }),
  },
  {
    field: 'description',
    prepareData: (article: ArticleData) => ({
      title: article.title,
      description: '',
      body: article.articleBody,
    }),
  },
  {
    field: 'body',
    prepareData: (article: ArticleData) => ({
      title: article.title,
      description: article.description,
      body: '',
    }),
  },
];

test.describe('Article creation', () => {
  test('Should create new article', async ({ articlesApi, apiUser }) => {
    const article = generateArticleData();
    const articleResponse = await articlesApi.createArticle(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      apiUser.token,
    );
    const articleResponseBody = await articleResponse.json();
    expect(articleResponse.status()).toBe(201);
    await expect(articleResponse).toBeOK();
    expect(articleResponseBody.article.title).toBe(article.title);
    expect(articleResponseBody.article.description).toBe(article.description);
    expect(articleResponseBody.article.body).toBe(article.articleBody);
    expect(articleResponseBody.article.tagList).toContain(article.tags);
  });

  test('Should reject article creation without authentication', async ({ articlesApi }) => {
    const article = generateArticleData();
    const articleResponse = await articlesApi.createArticle(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
    );
    expect(articleResponse.status()).toBe(401);
    const responseBody = await articleResponse.json();
    expect(responseBody.errors.token).toContain('is missing');
  });

  for (const validationCase of articleValidationCases) {
    test(`Should reject article creation without article ${validationCase.field}`, async ({
      articlesApi,
      apiUser,
    }) => {
      const article = generateArticleData();
      const invalidArticleData = validationCase.prepareData(article);

      const articleResponse = await articlesApi.createArticle(
        invalidArticleData.title,
        invalidArticleData.description,
        invalidArticleData.body,
        [article.tags],
        apiUser.token,
      );

      expect(articleResponse.status()).toBe(422);
      const articleResponseBody = await articleResponse.json();
      expect(articleResponseBody.errors[validationCase.field]).toContain("can't be blank");
    });
  }
});

test.describe('Article update', () => {
  test('Should update article by API', async ({ articlesApi, apiUser }) => {
    const article = generateArticleData();
    const updateArticle = generateArticleData();

    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      apiUser.token,
    );

    const slug = createdArticle.slug;

    const response = await articlesApi.updateArticle(
      slug,
      updateArticle.title,
      updateArticle.description,
      updateArticle.articleBody,
      [updateArticle.tags],
      apiUser.token,
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.article.title).toBe(updateArticle.title);
    expect(responseBody.article.description).toBe(updateArticle.description);
    expect(responseBody.article.body).toBe(updateArticle.articleBody);
    expect(responseBody.article.tagList).toContain(updateArticle.tags);

    const updatedSlug = responseBody.article.slug;
    const getArticle = await articlesApi.getArticleAndReturnData(updatedSlug, apiUser.token);

    expect(getArticle.title).toBe(updateArticle.title);

    await articlesApi.deleteArticle(updatedSlug, apiUser.token);
  });
});

test.describe('Article deletion', () => {
  test('Delete article by API', async ({ articlesApi, apiUser }) => {
    const article = generateArticleData();

    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      apiUser.token,
    );

    const beforeDeleteResponse = await articlesApi.getArticle(createdArticle.slug, apiUser.token);
    expect(beforeDeleteResponse.status()).toBe(200);
    const deleteResponse = await articlesApi.deleteArticle(createdArticle.slug, apiUser.token);
    expect(deleteResponse.status()).toBe(204);
    const afterDeleteResponse = await articlesApi.getArticle(createdArticle.slug, apiUser.token);
    expect(afterDeleteResponse.status()).toBe(404);
  });

  test('Should reject deleting article without authentication', async ({
    articlesApi,
    apiUser,
  }) => {
    const article = generateArticleData();

    const createdArticle = await articlesApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      apiUser.token,
    );
    const deleteResponse = await articlesApi.deleteArticle(createdArticle.slug);
    expect(deleteResponse.status()).toBe(401);
    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponseBody.errors.token).toContain('is missing');
    const getArticleResponse = await articlesApi.getArticle(createdArticle.slug, apiUser.token);
    expect(getArticleResponse.status()).toBe(200);
    await articlesApi.deleteArticle(createdArticle.slug, apiUser.token);
  });

  test('Should reject deleting non-existing article', async ({ articlesApi, apiUser }) => {
    const deleteResponse = await articlesApi.deleteArticle(
      `non-existing-article-${Date.now()}`,
      apiUser.token,
    );
    expect(deleteResponse.status()).toBe(404);
    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponseBody.errors.article).toContain('not found');
  });
});

test.describe('Article retrieval', () => {
  test('Should return 404 for non-existing article', async ({ articlesApi, apiUser }) => {
    const slug = `non-existing-article-${Date.now()}`;
    const response = await articlesApi.getArticle(slug, apiUser.token);
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody.errors.article).toContain('not found');
  });
});
