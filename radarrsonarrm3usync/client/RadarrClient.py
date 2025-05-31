from injector import inject
import requests
from typing import Dict, Any, List, Optional

from radarrsonarrm3usync.config.DefaultConfig import DefaultConfig


class RadarrClient:

    @inject
    def __init__(self, config: DefaultConfig):
        self.config = config
        self.base_url = self.config.get_value("radarr_base_url")
        self.api_key = self.config.get_value("radarr_api_key")
        self.enabled = self.config.get_value("radarr_enabled", False)
            
    def get_movies(self) -> List[Dict[str, Any]]:
        """Get all movies from Radarr."""
        if not self.enabled:
            return []
        
        self._check_configuration()
            
        response = requests.get(
            f"{self.base_url.rstrip('/')}/api/v3/movie",
            headers={"X-Api-Key": self.api_key}
        )
        response.raise_for_status()
        return response.json()
        
    def get_movie(self, movie_id: int) -> Optional[Dict[str, Any]]:
        """Get a specific movie by ID."""
        if not self.enabled:
            return None
        
        self._check_configuration()
            
        response = requests.get(
            f"{self.base_url.rstrip('/')}/api/v3/movie/{movie_id}",
            headers={"X-Api-Key": self.api_key}
        )
        response.raise_for_status()
        return response.json()
        
    def _check_configuration(self):
        """Check if Radarr is enabled and configured properly."""
        if self.enabled and (not self.base_url or not self.api_key):
            raise Exception("Radarr is enabled but base URL or API key is not configured")

