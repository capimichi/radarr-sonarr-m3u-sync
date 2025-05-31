from injector import inject
import requests
from typing import Dict, Any, List, Optional

from radarrsonarrm3usync.config.DefaultConfig import DefaultConfig
from radarrsonarrm3usync.model.SeriesResource import SeriesResource
from radarrsonarrm3usync.model.EpisodeResource import EpisodeResource


class SonarrClient:

    @inject
    def __init__(self, config: DefaultConfig):
        self.config = config
        self.base_url = self.config.get_value("sonarr_base_url")
        self.api_key = self.config.get_value("sonarr_api_key")
        self.enabled = self.config.get_value("sonarr_enabled", False)
        
            
    def get_series(self) -> List[SeriesResource]:
        """Get all series from Sonarr."""

        if not self.enabled:
            return []
        
        self._check_configuration()
            
        response = requests.get(
            f"{self.base_url.rstrip('/')}/api/v3/series",
            headers={"X-Api-Key": self.api_key},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        objs = []
        for item in data:
            series: SeriesResource = SeriesResource.model_validate(item)
            # for each poster_images prepend the base URL
            objs.append(series)
        return objs
        
    def get_series_by_id(self, series_id: int) -> Optional[SeriesResource]:
        """Get a specific series by ID."""
        if not self.enabled:
            return None
        
        self._check_configuration()
            
        response = requests.get(
            f"{self.base_url.rstrip('/')}/api/v3/series/{series_id}",
            headers={"X-Api-Key": self.api_key},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        return SeriesResource.model_validate(data) if data else None

    def get_episodes(self, series_id: int, season_number: int, includeEpisodeFile = False) -> List[EpisodeResource]:
        """Get episodes for a specific series and season."""
        if not self.enabled:
            return []
        
        self._check_configuration()
            
        response = requests.get(
            f"{self.base_url.rstrip('/')}/api/v3/episode",
            headers={"X-Api-Key": self.api_key},
            params={
                "seriesId": series_id, 
                "seasonNumber": season_number,
                "includeEpisodeFile": "true" if includeEpisodeFile else "false"
                },
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        objs = []
        for item in data:
            episode: EpisodeResource = EpisodeResource.model_validate(item)
            objs.append(episode)
        return objs

    def _check_configuration(self):
        """Check if Sonarr is enabled and configured properly."""
        if self.enabled and (not self.base_url or not self.api_key):
            raise Exception("Sonarr is enabled but base URL or API key is not configured")