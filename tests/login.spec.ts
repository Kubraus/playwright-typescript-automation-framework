import { test, expect } from '../src/fixtures/test.fixture';

test.beforeEach(async ({ realWorld }) => {
  await realWorld.openLoginPage();
});

test(
  'Should be able to login with valid credentials',
  { tag: '@smoke' },
  async ({ realWorld, apiUser }) => {
    await realWorld.login(apiUser.email, apiUser.password);
    await realWorld.shouldSeeSettingsLink();
  },
);

test('Should reject login with invalid password', async ({ realWorld, apiUser }) => {
  const invalidPassword = 'invalid-password';
  await realWorld.login(apiUser.email, invalidPassword);
  const error = await realWorld.getLoginErrorMessage();
  expect(error).toContain('credentials invalid');
});

test('Should reject login with invalid email', async ({ realWorld, apiUser }) => {
  const invalidEmail = 'invalidEmail@invalid.com';
  await realWorld.login(invalidEmail, apiUser.password);
  const error = await realWorld.getLoginErrorMessage();
  expect(error).toContain('credentials invalid');
});

test('Should disable login with empty email', async ({ realWorld, apiUser }) => {
  await realWorld.enterLoginPassword(apiUser.email);
  await realWorld.shouldSeeSignInButtonDisabled();
});

test('Should disable login with empty password', async ({ realWorld, apiUser }) => {
  await realWorld.enterLoginEmail(apiUser.email);
  await realWorld.shouldSeeSignInButtonDisabled();
});

test('Should logout authenticated user', { tag: '@smoke' }, async ({ realWorld, apiUser }) => {
  await realWorld.authenticateWithToken(apiUser.token);
  await realWorld.shouldSeeAuthenticatedHomePage();
  await realWorld.openSettingsPage();
  await realWorld.shouldSeeLogoutButton();
  await realWorld.logout();
  await realWorld.shouldSeeHomePage();
});
