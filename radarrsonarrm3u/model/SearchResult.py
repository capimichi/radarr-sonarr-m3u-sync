from injector import inject
from pydantic import BaseModel


class SearchResult(BaseModel):
    """Modello per i risultati della ricerca"""

    title: str
    type: str
    image: str
