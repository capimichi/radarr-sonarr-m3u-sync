import BackendClient from '../clients/BackendClient';
import type Series from '../types/Series';

export default class SeriesService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async getSeriesById(id: number): Promise<Series> {
    return this.client.getSeries(id);
  }
}
