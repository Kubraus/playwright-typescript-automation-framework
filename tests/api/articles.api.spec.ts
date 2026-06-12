import { test, expect } from '@playwright/test';
import { ArticlesApi } from '../../src/api/articles.api';
import { generateArticleData } from '../../src/test-data/article.data';
import { UsersApi } from '../../src/api/users.api';
import { generateUserData } from '../../src/test-data/user.data';

test('Create new article by API', async ({ request }) => {
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
