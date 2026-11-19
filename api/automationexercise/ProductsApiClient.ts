import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from '../base/BaseApiClient';

export interface ProductItem {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: { usertype: string };
    category: string;
  };
}

export interface ProductsApiResponse {
  responseCode: number;
  products: ProductItem[];
}

export class ProductsApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * GET /api/productsList - Retrieve full product catalog.
   */
  async getAllProducts(): Promise<APIResponse> {
    return await this.get('/api/productsList');
  }

  /**
   * POST /api/searchProduct - Search product catalog using form data.
   */
  async searchProduct(keyword: string): Promise<APIResponse> {
    return await this.post('/api/searchProduct', {
      form: {
        search_product: keyword
      }
    });
  }
}
