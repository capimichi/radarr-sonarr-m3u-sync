from typing import Any
from radarrsonarrm3usync.model.SearchResult import SearchResult
from radarrsonarrm3usync.model.SeriesResource import SeriesResource


class SearchResultFactory:
    """Factory class for creating SearchResult objects"""

    @staticmethod
    def create_from_series(series: SeriesResource) -> SearchResult:
        """Create a SearchResult object from a SeriesResource"""
        image = ""
        if series.images and len(series.images) > 0:
            for image in series.images:
                if image.coverType == "poster":
                    image = image.remoteUrl
                    break
            
        return SearchResult(
            title=series.title or "",
            type="series",
            image=image
        )
    
    @staticmethod
    def create_from_movie(movie: Any) -> SearchResult:
        """Create a SearchResult object from a MovieResource"""
        # MovieResource doesn't exist yet
        pass
