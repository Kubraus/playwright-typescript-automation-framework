import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { env } from '../config/env';
import { Article, ArticleResponse } from '../types/article.types';

export class ArticlesApi {
  constructor(private readonly request: APIRequestContext) {}

  private getAuthHeaders(token?: string): Record<string, string> {
    return token ? { Authorization: `Token ${token}` } : {};
  }

  createArticle(
    title: string,
    description: string,
    body: string,
    tagList: string[],
    token?: string,
  ): Promise<APIResponse> {
    const headers = this.getAuthHeaders(token);
    return this.request.post(`${env.API_URL}/articles`, {
      data: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers,
    });
  }

  updateArticle(
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    token?: string,
  ): Promise<APIResponse> {
    const headers = this.getAuthHeaders(token);
    return this.request.put(`${env.API_URL}/articles/${slug}`, {
      data: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers,
    });
  }

  async createArticleAndReturnData(
    title: string,
    description: string,
    body: string,
    tagList: string[],
    token: string,
  ): Promise<Article> {
    const response = await this.createArticle(title, description, body, tagList, token);
    await expect(response).toBeOK();
    expect(response.status()).toBe(201);
    const responseBody: ArticleResponse = await response.json();
    expect(responseBody.article.slug).toBeTruthy();
    return responseBody.article;
  }

  async waitUntilArticleExists(slug: string, token: string): Promise<void> {
    await expect
      .poll(
        async () => {
          const response = await this.getArticle(slug, token);
          return response.status();
        },
        {
          timeout: 20000,
          intervals: [500, 1000, 2000],
        },
      )
      .toBe(200);
  }

  deleteArticle(slug: string, token?: string): Promise<APIResponse> {
    const headers = this.getAuthHeaders(token);
    return this.request.delete(`${env.API_URL}/articles/${slug}`, {
      headers,
    });
  }

  getArticle(slug: string, token: string): Promise<APIResponse> {
    return this.request.get(`${env.API_URL}/articles/${slug}`, {
      headers: this.getAuthHeaders(token),
    });
  }

  async getArticleAndReturnData(slug: string, token: string): Promise<Article> {
    const response = await this.getArticle(slug, token);
    await expect(response).toBeOK();
    const responseBody: ArticleResponse = await response.json();
    return responseBody.article;
  }

  favoriteArticle(slug: string, token: string): Promise<APIResponse> {
    return this.request.post(`${env.API_URL}/articles/${slug}/favorite`, {
      headers: this.getAuthHeaders(token),
    });
  }

  async favoriteArticleAndReturnData(slug: string, token: string): Promise<Article> {
    const response = await this.favoriteArticle(slug, token);
    await expect(response).toBeOK();
    const responseBody: ArticleResponse = await response.json();
    return responseBody.article;
  }
}
