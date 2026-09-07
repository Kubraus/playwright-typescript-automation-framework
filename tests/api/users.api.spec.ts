import { test, expect } from '../../src/fixtures/test.fixture';
import { generateUserData } from '../../src/test-data/user.data';

test('Register user by API', { tag: '@smoke' }, async ({ usersApi }) => {
  const user = generateUserData();
  const response = await usersApi.registerUser(user.username, user.email, user.password);
  const responseBody = await response.json();
  expect(response.status()).toBe(201);
  await expect(response).toBeOK();
  expect(responseBody.user.email).toBe(user.email);
  expect(responseBody.user.username).toBe(user.username);
  expect(responseBody.user.token).toBeTruthy();
});

test('Login registered user by API', { tag: '@smoke' }, async ({ usersApi }) => {
  const user = generateUserData();
  await usersApi.registerUserAndReturnData(user.username, user.email, user.password);
  const loginResponse = await usersApi.loginUser(user.email, user.password);
  const loginResponseBody = await loginResponse.json();
  expect(loginResponse.status()).toBe(200);
  expect(loginResponseBody.user.email).toBe(user.email);
  expect(loginResponseBody.user.username).toBe(user.username);
  expect(loginResponseBody.user.token).toBeTruthy();
});

test('Should reject login with invalid credentials', async ({ usersApi }) => {
  const user = generateUserData();
  await usersApi.registerUserAndReturnData(user.username, user.email, user.password);
  const loginResponse = await usersApi.loginUser(user.email, user.password + Date.now());
  const loginResponseBody = await loginResponse.json();
  expect(loginResponse.status()).toBe(401);
  expect(loginResponseBody.errors.credentials).toContain('invalid');
});

test('Should reject user registration with empty email', async ({ usersApi }) => {
  const user = generateUserData();
  const response = await usersApi.registerUser(user.username, '', user.password);
  const responseBody = await response.json();
  expect(response.status()).toBe(422);
  expect(responseBody.errors.email).toContain("can't be blank");
});
