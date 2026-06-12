import { APIRequestContext, expect } from '@playwright/test';
import { env } from '../config/env';
import { User, UserResponse } from '../types/user-response.types';

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  async registerUser(username: string, email: string, password: string) {
    return await this.request.post(`${env.API_URL}/users`, {
      data: {
        user: {
          username,
          email,
          password,
        },
      },
    });
  }

  async registerUserAndReturnData(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const response = await this.registerUser(username, email, password);
    await expect(response).toBeOK();
    const responseBody: UserResponse = await response.json();
    return responseBody.user;
  }
}
