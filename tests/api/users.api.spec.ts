import { test, expect } from '@playwright/test';
import { UsersApi } from '../../src/api/users.api';
import { generateUserData } from '../../src/test-data/user.data';

test('Register user by API', async ({ request }) => {
  const usersApi = new UsersApi(request);
  const user = generateUserData();

  const response = await usersApi.registerUser(user.username, user.email, user.password);

  const responseBody = await response.json();
  expect(response.status()).toBe(201);
  await expect(response).toBeOK();
  expect(responseBody.user.email).toBe(user.email);
  expect(responseBody.user.username).toBe(user.username);
  expect(responseBody.user.token).toBeTruthy();
});
