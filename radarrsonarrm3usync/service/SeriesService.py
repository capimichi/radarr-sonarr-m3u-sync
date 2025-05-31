from injector import inject
from typing import Optional, List
from radarrsonarrm3usync.client.SonarrClient import SonarrClient
from radarrsonarrm3usync.model.SeriesResource import SeriesResource
from radarrsonarrm3usync.model.EpisodeResource import EpisodeResource


class SeriesService:

    @inject
    def __init__(self, sonarr_client: SonarrClient):
        self.sonarr_client = sonarr_client
        
    def get_series_by_id(self, series_id: int) -> Optional[SeriesResource]:
        """
        Get a specific series by ID.
        
        Args:
            series_id: The ID of the series to retrieve.
            
        Returns:
            The series resource if found, None otherwise.
        """
        return self.sonarr_client.get_series_by_id(series_id)

    def get_episodes_by_season(self, series_id: int, season_number: int, include_episode_file: bool = False) -> List[EpisodeResource]:
        """
        Get episodes for a specific series and season.
        
        Args:
            series_id: The ID of the series.
            season_number: The season number.
            include_episode_file: Whether to include episode file information.
            
        Returns:
            List of episode resources for the specified season.
        """
        return self.sonarr_client.get_episodes(series_id, season_number, include_episode_file)
