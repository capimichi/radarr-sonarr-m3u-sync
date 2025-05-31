interface Language {
  id: number;
  name: string;
}

interface Quality {
  id: number;
  name: string;
  source: string;
  resolution: number;
}

interface QualityRevision {
  version: number;
  real: number;
  isRepack: boolean;
}

interface QualityInfo {
  quality: Quality;
  revision: QualityRevision;
}

interface MediaInfo {
  audioBitrate: number;
  audioChannels: number;
  audioCodec: string;
  audioLanguages: string;
  audioStreamCount: number;
  videoBitDepth: number;
  videoBitrate: number;
  videoCodec: string;
  videoFps: number;
  videoDynamicRange: string;
  videoDynamicRangeType: string;
  resolution: string;
  runTime: string;
  scanType: string;
  subtitles: string;
}

interface EpisodeFile {
  seriesId: number;
  seasonNumber: number;
  relativePath: string;
  path: string;
  size: number;
  dateAdded: string;
  languages: Language[];
  quality: QualityInfo;
  customFormats: any[];
  customFormatScore: number;
  indexerFlags: number;
  releaseType: string;
  mediaInfo: MediaInfo;
  qualityCutoffNotMet: boolean;
  id: number;
}

export default interface Episode {
  seriesId: number;
  tvdbId: number;
  episodeFileId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  airDate: string;
  airDateUtc: string;
  lastSearchTime: string;
  runtime: number;
  overview: string;
  episodeFile: EpisodeFile;
  hasFile: boolean;
  monitored: boolean;
  absoluteEpisodeNumber: number;
  unverifiedSceneNumbering: boolean;
  finaleType?: string;
  id: number;
}
