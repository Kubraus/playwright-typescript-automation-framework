import { test } from '../src/fixtures/test.fixture';

test('Should be able to login with valid credentials.', async ({ realWorld, apiUser }) => {
  await realWorld.openLoginPage();
  await realWorld.login(apiUser.email, apiUser.password);
  await realWorld.shouldSeeSettingsLink();
});
