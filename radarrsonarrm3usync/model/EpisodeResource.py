from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from radarrsonarrm3usync.model.SeriesResource import SeriesResource
from radarrsonarrm3usync.model.MediaCover import MediaCover
from radarrsonarrm3usync.model.EpisodeFileResource import EpisodeFileResource


class EpisodeResource(BaseModel):
    """Modello per gli episodi di Sonarr"""
    
    id: int
    seriesId: int
    tvdbId: int
    episodeFileId: int
    seasonNumber: int
    episodeNumber: int
    title: Optional[str] = None
    airDate: Optional[str] = None
    airDateUtc: Optional[datetime] = None
    lastSearchTime: Optional[datetime] = None
    runtime: int
    finaleType: Optional[str] = None
    overview: Optional[str] = None
    episodeFile: Optional[EpisodeFileResource] = None  # /components/schemas/EpisodeFileResource
    hasFile: bool
    monitored: bool
    absoluteEpisodeNumber: Optional[int] = None
    sceneAbsoluteEpisodeNumber: Optional[int] = None
    sceneEpisodeNumber: Optional[int] = None
    sceneSeasonNumber: Optional[int] = None
    unverifiedSceneNumbering: bool
    endTime: Optional[datetime] = None
    grabDate: Optional[datetime] = None
    series: Optional[SeriesResource] = None
    images: Optional[List[MediaCover]] = None  # array di #/components/schemas/MediaCover
