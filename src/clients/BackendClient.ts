// Placeholder BackendClient
import type Configuration from '@/types/Configuration';
import type SearchResponse from '@/types/response/SearchResponse';
import type Series from '@/types/Series';
import type Episode from '@/types/Episode';

export default class BackendClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async search(term: string): Promise<SearchResponse> {
    try {
      const response = await fetch(`${this.backendUrl}/api/search?term=${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as SearchResponse;
    } catch (error) {
      console.error('Search request failed:', error);
      throw error;
    }
  }

  /**
   * Fetches the current configuration
   * @returns Promise with the configuration object
   */
  async getConfiguration(): Promise<Configuration> {
    try {
      const response = await fetch(`${this.backendUrl}/api/configuration`);
      
      if (!response.ok) {
        throw new Error(`Error fetching configuration: ${response.statusText}`);
      }
      
      return await response.json() as Configuration;
    } catch (error) {
      console.error('Failed to fetch configuration:', error);
      throw error;
    }
  }

  /**
   * Updates the configuration
   * @param configuration The new configuration to set
   * @returns Promise with the updated configuration
   */
  async updateConfiguration(configuration: Configuration): Promise<Configuration> {
    try {
      const response = await fetch(`${this.backendUrl}/api/configuration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configuration),
      });
      
      if (!response.ok) {
        throw new Error(`Error updating configuration: ${response.statusText}`);
      }
      
      return await response.json() as Configuration;
    } catch (error) {
      console.error('Failed to update configuration:', error);
      throw error;
    }
  }

  /**
   * Fetches a series by its ID
   * @param id The series ID to fetch
   * @returns Promise with the series object
   */
  async getSeries(id: number): Promise<Series> {
    try {
      const response = await fetch(`${this.backendUrl}/api/series/${id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching series: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as Series;
    } catch (error) {
      console.error(`Failed to fetch series with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetches episodes for a specific season of a series
   * @param seriesId The series ID
   * @param seasonNumber The season number
   * @returns Promise with the episodes array
   */
  async getSeasonEpisodes(seriesId: number, seasonNumber: number): Promise<Episode[]> {
    try {
      const response = await fetch(`${this.backendUrl}/api/series/${seriesId}/episodes?season_number=${seasonNumber}&include_episode_file=true`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching episodes: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as Episode[];
    } catch (error) {
      console.error(`Failed to fetch episodes for series ${seriesId}, season ${seasonNumber}:`, error);
      throw error;
    }
  }

  /**
   * Downloads a video from an m3u8 URL to the specified path
   * @param url The m3u8 URL to download from
   * @param path The path where to save the downloaded video
   * @param onProgress Optional callback for progress updates
   * @returns Promise that resolves when download is complete
   */
  async downloadM3u8(
    url: string, 
    path: string, 
    onProgress?: (progress: { progress: number; completed: boolean }) => void
  ): Promise<void> {
    try {
      const downloadUrl = `${this.backendUrl}/api/download/?url=${encodeURIComponent(url)}&path=${encodeURIComponent(path)}`;
      
      const response = await fetch(downloadUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok || !response.body) {
        throw new Error(`Error downloading video: ${response.status} ${response.statusText}`);
      }
      
      // Process the streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const decodedChunk = decoder.decode(value, { stream: true });
        const lines = decodedChunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          try {
            // Handle lines that start with "data: "
            let jsonStr = line;
            if (line.startsWith('data:')) {
              jsonStr = line.substring(5).trim();
            }
            
            const data = JSON.parse(jsonStr);
            if (onProgress && typeof data.progress === 'number') {
              onProgress({ 
                progress: data.progress, 
                completed: !!data.completed 
              });
            }
          } catch (e) {
            console.warn('Could not parse progress data:', line);
          }
        }
      }
    } catch (error) {
      console.error('Download request failed:', error);
      throw error;
    }
  }
}
