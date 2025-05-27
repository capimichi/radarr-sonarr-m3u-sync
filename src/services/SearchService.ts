import BackendClient from '../clients/BackendClient';
import type { SearchResult } from '../types/SearchResult';

export default class SearchService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async search(term: string): Promise<SearchResult[]> {
    return this.client.search(term);
  }
}
