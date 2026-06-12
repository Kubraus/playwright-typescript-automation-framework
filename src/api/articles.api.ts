import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { env } from '../config/env';
import { Article, ArticleResponse } from '../types/article.types';

export class ArticlesApi {
  constructor(private readonly request: APIRequestContext) {}

  async createArticle(
    title: string,
    description: string,
    body: string,
    tagList: string[],
    token: string,
  ): Promise<APIResponse> {
    return await this.request.post(`${env.API_URL}/articles`, {
      data: {
        article: {
          title,
          description,
          body,
          tagList,
        },
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  async createArticleAndReturnData(
    title: string,
    description: string,
    body: string,
    tagList: string[],
    token: string,
  ) {
    const response = await this.createArticle(title, description, body, tagList, token);
    await expect(response).toBeOK();
    expect(response.status()).toBe(201);
    const responseBody: ArticleResponse = await response.json();
    expect(responseBody.article.slug).toBeTruthy();
    return responseBody.article;
  }

  async deleteArticle(slug: string, token: string): Promise<APIResponse> {
    return await this.request.delete(`${env.API_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  async getArticle(slug: string, token: string): Promise<APIResponse> {
    return await this.request.get(`${env.API_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  async getArticleAndReturnData(slug: string, token: string): Promise<Article> {
    const response = await this.getArticle(slug, token);
    await expect(response).toBeOK();
    const responseBody: ArticleResponse = await response.json();
    return responseBody.article;
  }
}
