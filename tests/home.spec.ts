import { test } from '../src/fixtures/test.fixture';

test('Elements should be visible on the Home Page', async ({ realWorld }) => {
  await realWorld.openHomePage();
  await realWorld.shouldSeeHomePage();
});
