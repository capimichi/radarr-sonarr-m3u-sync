import BackendClient from '@/clients/BackendClient';
import type SearchResponse from '@/types/response/SearchResponse';

export default class SearchService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async search(term: string): Promise<SearchResponse> {
    return this.client.search(term);
  }
}
