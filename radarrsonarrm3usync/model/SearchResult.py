from injector import inject
from pydantic import BaseModel


class SearchResult(BaseModel):
    """Modello per i risultati della ricerca"""

    id: int
    title: str
    type: str
    image: str
