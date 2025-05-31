from injector import inject
from fastapi import APIRouter, HTTPException, status
from radarrsonarrm3usync.model.response.GetSearchResultsResponse import GetSearchResultsResponse
from radarrsonarrm3usync.service.SearchService import SearchService


class SearchController:

    @inject
    def __init__(self, search_service: SearchService):
        self.search_service = search_service
        self.router = APIRouter(prefix="/search", tags=["Search"])
        self._register_routes()
    
    def _register_routes(self):
        """Registra le rotte per il controller"""
        self.router.add_api_route("", self.get_search_results, methods=["GET"])
        
    async def get_search_results(self, term: str) -> GetSearchResultsResponse:
        """Ottiene tutti i search_results"""
        search_results = self.search_service.search(term)
        get_search_results_response = GetSearchResultsResponse(results=search_results)
        return get_search_results_response

