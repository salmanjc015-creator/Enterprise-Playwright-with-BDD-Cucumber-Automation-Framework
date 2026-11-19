import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from '../base/BaseApiClient';

export interface VerifyLoginApiResponse {
  responseCode: number;
  message: string;
}

export class UserApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * POST /api/verifyLogin - Verify user login credentials.
   */
  async verifyLogin(email?: string, password?: string): Promise<APIResponse> {
    const form: Record<string, string> = {};
    if (email !== undefined) form.email = email;
    if (password !== undefined) form.password = password;

    return await this.post('/api/verifyLogin', {
      form
    });
  }

  /**
   * GET /api/getUserDetailByEmail - Fetch user account details by email.
   */
  async getUserDetailByEmail(email: string): Promise<APIResponse> {
    return await this.get('/api/getUserDetailByEmail', {
      params: {
        email
      }
    });
  }
}
