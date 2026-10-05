import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { env } from '../config/env';
import { User, UserResponse } from '../types/user-response.types';

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  registerUser(username: string, email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${env.API_URL}/users`, {
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

  loginUser(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${env.API_URL}/users/login`, {
      data: {
        user: {
          email,
          password,
        },
      },
    });
  }
}
