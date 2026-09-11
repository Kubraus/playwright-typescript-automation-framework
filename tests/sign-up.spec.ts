import { test } from '../src/fixtures/test.fixture';
import { generateUserData } from '../src/test-data/user.data';

test.describe('Sign up', () => {
  test.beforeEach(async ({ realWorld }) => {
    await realWorld.openSignUpPage();
  });

  test('Should register new user with valid data', async ({ realWorld }) => {
    const user = generateUserData();
    await realWorld.register(user.username, user.email, user.password);
    await realWorld.shouldSeeSettingsLink();
  });

  test('Should disable sign up with empty username', async ({ realWorld }) => {
    const user = generateUserData();
    await realWorld.fillSignUpEmail(user.email);
    await realWorld.fillSignUpPassword(user.password);
    await realWorld.shouldSeeSignUpButtonDisabled();
  });

  test('Should disable sign up with empty email', async ({ realWorld }) => {
    const user = generateUserData();
    await realWorld.fillSignUpUsername(user.username);
    await realWorld.fillSignUpPassword(user.password);
    await realWorld.shouldSeeSignUpButtonDisabled();
  });

  test('Should disable sign up with empty password', async ({ realWorld }) => {
    const user = generateUserData();
    await realWorld.fillSignUpUsername(user.username);
    await realWorld.fillSignUpEmail(user.email);
    await realWorld.shouldSeeSignUpButtonDisabled();
  });
});
