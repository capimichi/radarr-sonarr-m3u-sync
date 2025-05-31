import type Season from "./Season";

interface Image {
  coverType: string;
  url: string;
  remoteUrl: string;
}

interface Statistics {
  previousAiring: Date | null;
  episodeFileCount: number;
  episodeCount: number;
  totalEpisodeCount: number;
  sizeOnDisk: number;
  percentOfEpisodes: number;
}

export default interface Series {
  id: number;
  title: string; 
  overview: string;
  status: string;
  year: number;
  path: string;
  rootFolderPath: string;
  statistics: Statistics;
  images: Image[];
  seasons: Season[];
}
