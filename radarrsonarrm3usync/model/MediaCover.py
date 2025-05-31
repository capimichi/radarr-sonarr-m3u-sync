
from typing import Optional
from pydantic import BaseModel

class MediaCover(BaseModel):
    coverType: str
    url: str
    remoteUrl: Optional[str] = None