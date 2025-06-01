import BackendClient from '@/clients/BackendClient';
import type Series from '@/types/Series';
import type Episode from '@/types/Episode';

export default class SeriesService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  async getSeriesById(id: number): Promise<Series> {
    return this.client.getSeries(id);
  }

  async getSeasonEpisodes(seriesId: number, seasonNumber: number): Promise<Episode[]> {
    return this.client.getSeasonEpisodes(seriesId, seasonNumber);
  }
}
