from injector import inject
from fastapi import APIRouter, HTTPException, status
from typing import Optional
from radarrsonarrm3usync.model.SeriesResource import SeriesResource
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
        
    async def get_series_by_id(self, series_id: int) -> SeriesResource:
        """Ottiene una serie specifica tramite ID"""
        series = self.series_service.get_series_by_id(series_id)
        if not series:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Series with ID {series_id} not found"
            )
        return series
