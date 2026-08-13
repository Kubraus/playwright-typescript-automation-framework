import { test } from '../src/fixtures/test.fixture';
import { generateUserData } from '../src/test-data/user.data';

type UserData = ReturnType<typeof generateUserData>;

let user: UserData;

test.describe('Sign up', () => {
  test.beforeEach(async ({ realWorld }) => {
    await realWorld.openSignUpPage();
    user = generateUserData();
  });

  test('Should register new user with valid data', async ({ realWorld }) => {
    await realWorld.register(user.username, user.email, user.password);
    await realWorld.shouldSeeSettingsLink();
  });

  test('Should disable sign up with empty username', async ({ realWorld }) => {
    await realWorld.fillSignUpEmail(user.email);
    await realWorld.fillSignUpPassword(user.password);
    await realWorld.shouldSeeSignUpButtonDisabled();
  });

  test('Should disable sign up with empty email', async ({ realWorld }) => {
    await realWorld.fillSignUpUsername(user.username);
    await realWorld.fillSignUpPassword(user.password);
    await realWorld.shouldSeeSignUpButtonDisabled();
  });

  test('Should disable sign up with empty password', async ({ realWorld }) => {
    await realWorld.fillSignUpUsername(user.username);
    await realWorld.fillSignUpEmail(user.email);
    await realWorld.shouldSeeSignUpButtonDisabled();
  });
});
