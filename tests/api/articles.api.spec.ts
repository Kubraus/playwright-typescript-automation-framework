import { test, expect } from '@playwright/test';
import { ArticlesApi } from '../../src/api/articles.api';
import { generateArticleData } from '../../src/test-data/article.data';
import { UsersApi } from '../../src/api/users.api';
import { generateUserData } from '../../src/test-data/user.data';

test.describe('Article creation', () => {
  test('Should create new article', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;

    const articleResponse = await articleApi.createArticle(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      token,
    );
    const articleResponseBody = await articleResponse.json();
    expect(articleResponse.status()).toBe(201);
    await expect(articleResponse).toBeOK();
    expect(articleResponseBody.article.title).toBe(article.title);
    expect(articleResponseBody.article.description).toBe(article.description);
    expect(articleResponseBody.article.body).toBe(article.articleBody);
    expect(articleResponseBody.article.tagList).toContain(article.tags);
  });

  test('Should reject article creation without authentication', async ({ request }) => {
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const articleResponse = await articleApi.createArticle(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
    );
    expect(articleResponse.status()).toBe(401);
    const responseBody = await articleResponse.json();
    expect(responseBody.errors.token).toContain('is missing');
  });

  test('Should reject article creation without article title', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;

    const articleResponse = await articleApi.createArticle(
      '',
      article.description,
      article.articleBody,
      [article.tags],
      token,
    );
    expect(articleResponse.status()).toBe(422);
    const articleResponseBody = await articleResponse.json();
    expect(articleResponseBody.errors.title).toContain("can't be blank");
  });

  test('Should reject article creation without article description', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;

    const articleResponse = await articleApi.createArticle(
      article.title,
      '',
      article.articleBody,
      [article.tags],
      token,
    );
    expect(articleResponse.status()).toBe(422);
    const articleResponseBody = await articleResponse.json();
    expect(articleResponseBody.errors.description).toContain("can't be blank");
  });

  test('Should reject article creation without article body', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;

    const articleResponse = await articleApi.createArticle(
      article.title,
      article.description,
      '',
      [article.tags],
      token,
    );

    expect(articleResponse.status()).toBe(422);
    const articleResponseBody = await articleResponse.json();
    expect(articleResponseBody.errors.body).toContain("can't be blank");
  });
});

test.describe('Article deletion', () => {
  test('Delete article by API', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;

    const createdArticle = await articleApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      token,
    );
    const beforeDeleteResponse = await articleApi.getArticle(createdArticle.slug, token);
    expect(beforeDeleteResponse.status()).toBe(200);

    const deleteResponse = await articleApi.deleteArticle(createdArticle.slug, token);
    expect(deleteResponse.status()).toBe(204);

    const afterDeleteResponse = await articleApi.getArticle(createdArticle.slug, token);
    expect(afterDeleteResponse.status()).toBe(404);
  });

  test('Should reject deleting article without authentication', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const article = generateArticleData();
    const articleApi = new ArticlesApi(request);

    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;

    const createdArticle = await articleApi.createArticleAndReturnData(
      article.title,
      article.description,
      article.articleBody,
      [article.tags],
      token,
    );

    const deleteResponse = await articleApi.deleteArticle(createdArticle.slug);
    expect(deleteResponse.status()).toBe(401);
    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponseBody.errors.token).toContain('is missing');

    const getArticleResponse = await articleApi.getArticle(createdArticle.slug, token);
    expect(getArticleResponse.status()).toBe(200);
  });

  test('Should reject deleting non-existing article', async ({ request }) => {
    const usersApi = new UsersApi(request);
    const user = generateUserData();
    const articleApi = new ArticlesApi(request);
    const response = await usersApi.registerUser(user.username, user.email, user.password);
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    await expect(response).toBeOK();
    expect(responseBody.user.token).toBeTruthy();
    const token: string = responseBody.user.token;
    const deleteResponse = await articleApi.deleteArticle(
      `non-existing-article-${Date.now()}`,
      token,
    );
    expect(deleteResponse.status()).toBe(404);
    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponseBody.errors.article).toContain('not found');
  });
});
