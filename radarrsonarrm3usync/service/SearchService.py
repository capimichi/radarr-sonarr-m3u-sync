from injector import inject
from typing import List, Dict, Any
from radarrsonarrm3usync.client.RadarrClient import RadarrClient
from radarrsonarrm3usync.client.SonarrClient import SonarrClient
from radarrsonarrm3usync.config.DefaultConfig import DefaultConfig
from radarrsonarrm3usync.factory.SearchResultFactory import SearchResultFactory


class SearchService:

    @inject
    def __init__(
        self, 
        radarr_client: RadarrClient, 
        sonarr_client: SonarrClient,
        default_config: DefaultConfig
        ):
        self.radarr_client = radarr_client
        self.sonarr_client = sonarr_client
        self.default_config = default_config
        
    def search(self, term: str) -> List[Dict[str, Any]]:
        """
        Search for movies and series with titles that match the given term.
        
        Args:
            term: The search term to match against titles.
            
        Returns:
            A list of matching items (movies and series).
        """
        # Normalize the search term (lowercase for case-insensitive matching)
        term_lower = term.lower()

        search_results = []
        
        # Get all movies from Radarr
        movies = self.radarr_client.get_movies()
        
        
        # Get all series from Sonarr
        series = self.sonarr_client.get_series()
        

        for series_item in series:
            search_result = SearchResultFactory.create_from_series(series_item)

            if term_lower in search_result.title.lower():
                # If the series title matches the search term, add it to the results
                search_results.append(search_result)
        
        # Combine the results
        return search_results

