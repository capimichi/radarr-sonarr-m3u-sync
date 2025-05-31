/**
 * Complete application configuration model
 */
export default interface Configuration {
  radarr_enabled: boolean;
  radarr_base_url: string;
  radarr_api_key: string;
  sonarr_enabled: boolean;
  sonarr_base_url: string;
  sonarr_api_key: string;
}
