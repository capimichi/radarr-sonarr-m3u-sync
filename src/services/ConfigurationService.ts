import BackendClient from '../clients/BackendClient';
import type Configuration from '../types/Configuration';

export default class ConfigurationService {
  private client: BackendClient;

  constructor(client: BackendClient) {
    this.client = client;
  }

  /**
   * Gets the current configuration
   * @returns Promise with configuration object
   */
  async getConfiguration(): Promise<Configuration> {
    return this.client.getConfiguration();
  }

  /**
   * Updates the configuration
   * @param configuration Configuration object to save
   * @returns Promise with the updated configuration
   */
  async updateConfiguration(configuration: Configuration): Promise<Configuration> {
    return this.client.updateConfiguration(configuration);
  }
}
