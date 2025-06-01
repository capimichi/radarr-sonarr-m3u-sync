import React, { useState, useEffect } from 'react';
import type Season from '@/types/Season';
import type Episode from '@/types/Episode';
import type Configuration from '@/types/Configuration';
import { useServices } from '@/servicesContext';
import type Series from '@/types/Series';
import SeasonHeader from './SeasonHeader';
import SeasonStats from './SeasonStats';
import EpisodeList from './EpisodeList';

interface SeasonProps {
    season: Season;
    series: Series;
}

const SeasonItem: React.FC<SeasonProps> = ({ season, series }) => {
  const { seriesService, downloadService, configurationService } = useServices();
  const seriesId = series.id;
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEpisodesExpanded, setIsEpisodesExpanded] = useState(false);
  const [m3u8Urls, setM3u8Urls] = useState<Record<number, string>>({});
  const [downloadPaths, setDownloadPaths] = useState<Record<number, string>>({});
  const [downloadProgress, setDownloadProgress] = useState<Record<number, number>>({});
  const [isDownloading, setIsDownloading] = useState<Record<number, boolean>>({});
  const [configuration, setConfiguration] = useState<Configuration | null>(null);

  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        const config = await configurationService.getConfiguration();
        setConfiguration(config);
      } catch (error) {
        console.error('Error fetching configuration:', error);
      }
    };
    
    fetchConfiguration();
  }, []);

  const fetchEpisodes = async () => {
    if (!seriesId) return;
    
    setIsLoading(true);
    try {
      const episodeList = await seriesService.getSeasonEpisodes(seriesId, season.seasonNumber);
      setEpisodes(episodeList);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [seriesId, season.seasonNumber]);

  const buildFilePath = (episode: Episode): string => {
    let path = configuration!.sonarr_base_dir;

    path = path.endsWith('/') ? path : `${path}/`;

    const slug = series!.titleSlug;

    path += series!.path.replace(series!.rootFolderPath, '');
    path = path.endsWith('/') ? path : `${path}/`;
    path += `Season ${season.seasonNumber.toString()}/`;
    path += `${slug}-s${season.seasonNumber.toString().padStart(2, '0')}e${episode.episodeNumber.toString().padStart(2, '0')}.mp4`;
    return path;
  };

  const handleM3u8UrlChange = (episodeId: number, url: string) => {
    setM3u8Urls(prev => ({
      ...prev,
      [episodeId]: url
    }));
  };

  const handleDownloadPathChange = (episodeId: number, path: string) => {
    setDownloadPaths(prev => ({
      ...prev,
      [episodeId]: path
    }));
  };

  const handleDownload = async (episodeId: number) => {
    const url = m3u8Urls[episodeId];
    const episode = episodes.find(ep => ep.id === episodeId);
    
    // Get the path from state or build default path
    const path = downloadPaths[episodeId] || 
      (episode ? buildFilePath(episode) : `/Users/michele/Downloads/episode_${episodeId}.mp4`);

    if (!url) return;

    setIsDownloading(prev => ({ ...prev, [episodeId]: true }));
    setDownloadProgress(prev => ({ ...prev, [episodeId]: 0 }));

    try {
      await downloadService.downloadM3u8(
        url,
        path,
        ({ progress, completed }) => {
          setDownloadProgress(prev => ({ ...prev, [episodeId]: progress }));
          
          if (completed) {
            setIsDownloading(prev => ({ ...prev, [episodeId]: false }));
          }
        }
      );
      
      console.log(`Downloaded episode ${episodeId} from ${url} to ${path}`);
    } catch (error) {
      console.error('Error downloading episode:', error);
      setIsDownloading(prev => ({ ...prev, [episodeId]: false }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <SeasonHeader season={season} />
        
        <SeasonStats season={season} />

        <EpisodeList
          episodes={episodes}
          seasonNumber={season.seasonNumber}
          isLoading={isLoading}
          isExpanded={isEpisodesExpanded}
          onToggleExpand={() => setIsEpisodesExpanded(!isEpisodesExpanded)}
          m3u8Urls={m3u8Urls}
          downloadPaths={downloadPaths}
          downloadProgress={downloadProgress}
          isDownloading={isDownloading}
          onM3u8UrlChange={handleM3u8UrlChange}
          onDownloadPathChange={handleDownloadPathChange}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
};

export default SeasonItem;
