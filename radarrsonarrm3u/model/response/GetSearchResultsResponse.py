from typing import List
from injector import inject
from pydantic import BaseModel
from radarrsonarrm3u.model.SearchResult import SearchResult


class GetSearchResultsResponse(BaseModel):

    results: List[SearchResult]
