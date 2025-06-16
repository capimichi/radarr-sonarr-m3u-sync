from pydantic import BaseModel
from typing import Optional, List, Dict, Union
from datetime import datetime


# Placeholder models for referenced schemas - these should be created separately
class Language(BaseModel):
    pass


class QualityModel(BaseModel):
    quality: Optional[Dict[str, Union[str, int, float]]] = None 


class CustomFormatResource(BaseModel):
    pass


class ReleaseType(BaseModel):
    pass


class MediaInfoResource(BaseModel):
    pass


class EpisodeFileResource(BaseModel):
    """Modello per i file degli episodi di Sonarr"""
    
    id: int
    seriesId: int
    seasonNumber: int
    relativePath: Optional[str] = None
    path: Optional[str] = None
    size: int
    dateAdded: datetime
    sceneName: Optional[str] = None
    releaseGroup: Optional[str] = None
    languages: Optional[List[Language]] = None
    quality: QualityModel
    customFormats: Optional[List[CustomFormatResource]] = None
    customFormatScore: int
    indexerFlags: Optional[int] = None
    mediaInfo: MediaInfoResource
    qualityCutoffNotMet: bool
