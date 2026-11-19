import { APIRequestContext, APIResponse } from '@playwright/test';
import { envConfig } from '../../utils/env';

/**
 * Base API Client providing core HTTP execution methods, base URL resolution,
 * and unified error/response handling on top of Playwright's APIRequestContext.
 */
export class BaseApiClient {
  protected readonly request: APIRequestContext;
  protected readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl?: string) {
    this.request = request;
    this.baseUrl = baseUrl ?? envConfig.urls.automationExercise;
  }

  async get(endpoint: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
    const url = this.resolveUrl(endpoint);
    return await this.request.get(url, options);
  }

  async post(endpoint: string, options?: Parameters<APIRequestContext['post']>[1]): Promise<APIResponse> {
    const url = this.resolveUrl(endpoint);
    return await this.request.post(url, options);
  }

  async put(endpoint: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
    const url = this.resolveUrl(endpoint);
    return await this.request.put(url, options);
  }

  async delete(endpoint: string, options?: Parameters<APIRequestContext['delete']>[1]): Promise<APIResponse> {
    const url = this.resolveUrl(endpoint);
    return await this.request.delete(url, options);
  }

  private resolveUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    const cleanBase = this.baseUrl.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    return `${cleanBase}/${cleanEndpoint}`;
  }
}
