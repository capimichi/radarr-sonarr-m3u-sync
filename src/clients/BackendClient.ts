// Placeholder BackendClient
import type SearchResult from '../types/SearchResult';
import type Configuration from '../types/Configuration';
import type SearchResponse from '../types/response/SearchResponse';
import type Series from '../types/Series';

export default class BackendClient {
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
    console.log('BackendClient initialized with URL:', backendUrl);
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
}
