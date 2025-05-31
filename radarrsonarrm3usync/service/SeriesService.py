from injector import inject
from typing import Optional
from radarrsonarrm3usync.client.SonarrClient import SonarrClient
from radarrsonarrm3usync.model.SeriesResource import SeriesResource


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
