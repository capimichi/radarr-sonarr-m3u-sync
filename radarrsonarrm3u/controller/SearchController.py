from injector import inject
from fastapi import APIRouter, HTTPException, status
from radarrsonarrm3u.model.response.GetSearchResultsResponse import GetSearchResultsResponse


class SearchController:

    @inject
    def __init__(self):
        self.router = APIRouter(prefix="/search", tags=["Search"])
        self._register_routes()
    
    def _register_routes(self):
        """Registra le rotte per il controller"""
        self.router.add_api_route("", self.get_search_results, methods=["GET"])
        
    async def get_search_results(self, term: str) -> GetSearchResultsResponse:
        """Ottiene tutti i search_results"""
        # Implementazione provvisoria
        return {"search_results": []}
    
    