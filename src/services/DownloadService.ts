import BackendClient from '@/clients/BackendClient';
import type DownloadProgress from '@/types/DownloadProgress';

export default class DownloadService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  /**
   * Download a video from m3u8 URL to specified path
   * @param url The m3u8 URL to download from
   * @param path The local path where to save the video
   * @param onProgress Callback for progress updates
   * @returns Promise that resolves when download is completed
   */
  async downloadM3u8(
    url: string, 
    path: string, 
    onProgress?: (progress: DownloadProgress) => void
  ): Promise<void> {
    return this.client.downloadM3u8(url, path, onProgress);
  }
}
