import { test } from '../src/fixtures/test.fixture';
import { generateArticleData } from '../src/test-data/article.data';

test.describe.configure({ mode: 'serial' });

test('Authenticated user can create article', async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  const article = generateArticleData();
  await realWorld.openNewArticleEditor();
  await realWorld.createArticle(
    article.title,
    article.description,
    article.articleBody,
    article.tags,
  );
  await realWorld.shouldSeeArticle(article.title);
});

test('Authenticated user can edit created article', async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  const originalArticle = generateArticleData();
  const updatedArticle = generateArticleData();
  await realWorld.openNewArticleEditor();
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

test('Authenticated user can delete created article', async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  const article = generateArticleData();
  await realWorld.openNewArticleEditor();
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
