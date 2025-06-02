import BackendClient from '@/clients/BackendClient';
import type Series from '@/types/Series';
import type Episode from '@/types/Episode';
import type DownloadProgress from '@/types/DownloadProgress';
import { buildEpisodeFilePath } from '@/utils/pathUtils';

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

  /**
   * Download an episode from m3u8 URL with automatic path generation
   * @param seriesId The ID of the series
   * @param seasonNumber The season number
   * @param episode The episode object
   * @param url The m3u8 URL to download from
   * @param onProgress Callback for progress updates
   * @returns Promise that resolves when download is completed
   */
  async download(
    seriesId: number,
    seasonNumber: number,
    episode: Episode,
    url: string,
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<void> {
    
    // Get series data and configuration
    const [series, configuration] = await Promise.all([
      this.getSeriesById(seriesId),
      this.client.getConfiguration()
    ]);
    
    // Build the file path using configuration base directory
    const path = buildEpisodeFilePath(series, seasonNumber, episode, configuration.sonarr_base_dir);
    
    // Download using the backend client with proper progress handling
    return this.client.downloadM3u8(url, path, (progressData: DownloadProgress) => {
      if (onProgress) {
        onProgress(progressData);
      }
    });
  }
}
