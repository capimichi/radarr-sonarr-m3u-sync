

interface Statistics {
  previousAiring: Date | null;
  episodeFileCount: number;
  episodeCount: number;
  totalEpisodeCount: number;
  sizeOnDisk: number;
  percentOfEpisodes: number;
}

export default interface Season {
  seasonNumber: number;
  monitored: boolean;
  statistics: Statistics;
}
