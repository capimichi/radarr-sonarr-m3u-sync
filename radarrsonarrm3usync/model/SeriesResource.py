from datetime import datetime
from typing import List, Optional
from enum import Enum
from pydantic import BaseModel


# Enum types
class SeriesStatusType(str, Enum):
    CONTINUING = "continuing"
    ENDED = "ended"
    UPCOMING = "upcoming"


class NewItemMonitorTypes(str, Enum):
    NONE = "none"
    ALL = "all"
    NEW = "new"


class SeriesTypes(str, Enum):
    STANDARD = "standard"
    ANIME = "anime"
    DAILY = "daily"


# Nested models
class AlternateTitleResource(BaseModel):
    title: Optional[str] = None
    seasonNumber: Optional[int] = None


class Language(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None


class MediaCover(BaseModel):
    coverType: str
    url: str
    remoteUrl: Optional[str] = None


class SeasonStatisticsResource(BaseModel):
    previousAiring: Optional[datetime] = None
    episodeFileCount: int
    episodeCount: int
    totalEpisodeCount: int
    sizeOnDisk: int
    percentOfEpisodes: float


class SeasonResource(BaseModel):
    seasonNumber: int
    monitored: bool
    statistics: Optional[SeasonStatisticsResource] = None


class AddSeriesOptions(BaseModel):
    monitor: Optional[str] = None
    searchForMissingEpisodes: bool = False
    searchForCutoffUnmetEpisodes: bool = False


class Ratings(BaseModel):
    votes: int
    value: float


class SeriesStatisticsResource(BaseModel):
    seasonCount: int
    episodeFileCount: int
    episodeCount: int
    totalEpisodeCount: int
    sizeOnDisk: int
    percentOfEpisodes: float


# Main SeriesResource class
class SeriesResource(BaseModel):
    id: int
    title: Optional[str] = None
    alternateTitles: Optional[List[AlternateTitleResource]] = None
    sortTitle: Optional[str] = None
    status: SeriesStatusType
    ended: bool
    profileName: Optional[str] = None
    overview: Optional[str] = None
    nextAiring: Optional[datetime] = None
    previousAiring: Optional[datetime] = None
    network: Optional[str] = None
    airTime: Optional[str] = None
    images: Optional[List[MediaCover]] = None
    originalLanguage: Language
    remotePoster: Optional[str] = None
    seasons: Optional[List[SeasonResource]] = None
    year: int
    path: Optional[str] = None
    qualityProfileId: int
    seasonFolder: bool
    monitored: bool
    monitorNewItems: NewItemMonitorTypes
    useSceneNumbering: bool
    runtime: int
    tvdbId: int
    tvRageId: int
    tvMazeId: int
    tmdbId: int
    firstAired: Optional[datetime] = None
    lastAired: Optional[datetime] = None
    seriesType: SeriesTypes
    cleanTitle: Optional[str] = None
    imdbId: Optional[str] = None
    titleSlug: Optional[str] = None
    rootFolderPath: Optional[str] = None
    folder: Optional[str] = None
    certification: Optional[str] = None
    genres: Optional[List[str]] = None
    tags: Optional[List[int]] = None
    added: datetime
    addOptions: Optional[AddSeriesOptions] = None
    ratings: Ratings
    statistics: SeriesStatisticsResource
    episodesChanged: Optional[bool] = None
    languageProfileId: Optional[int] = None  # deprecated field
