from injector import inject
from fastapi import APIRouter, HTTPException, status, Query
from typing import Optional, List
from radarrsonarrm3usync.model.SeriesResource import SeriesResource
from radarrsonarrm3usync.model.EpisodeResource import EpisodeResource
from radarrsonarrm3usync.service.SeriesService import SeriesService


class SeriesController:

    @inject
    def __init__(self, series_service: SeriesService):
        self.series_service = series_service
        self.router = APIRouter(prefix="/series", tags=["Series"])
        self._register_routes()
    
    def _register_routes(self):
        """Registra le rotte per il controller"""
        self.router.add_api_route("/{series_id}", self.get_series_by_id, methods=["GET"])
        self.router.add_api_route("/{series_id}/episodes", self.get_episodes_by_season, methods=["GET"])
        
    async def get_series_by_id(self, series_id: int) -> SeriesResource:
        """Ottiene una serie specifica tramite ID"""
        series = self.series_service.get_series_by_id(series_id)
        if not series:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Series with ID {series_id} not found"
            )
        return series
        
    async def get_episodes_by_season(
        self, 
        series_id: int, 
        season_number: int = Query(..., description="Season number"),
        include_episode_file: bool = Query(False, description="Include episode file information")
    ) -> List[EpisodeResource]:
        """Ottiene gli episodi di una stagione specifica di una serie"""
        episodes = self.series_service.get_episodes_by_season(series_id, season_number, include_episode_file)
        if not episodes:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No episodes found for series {series_id}, season {season_number}"
            )
        
        return episodes
