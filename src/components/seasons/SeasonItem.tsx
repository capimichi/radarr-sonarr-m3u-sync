import React, { useState, useEffect } from 'react';
import type Season from '../../types/Season';
import type Episode from '../../types/Episode';
import type Configuration from '../../types/Configuration';
import { useServices } from '../../servicesContext';
import type Series from '../../types/Series';

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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">
              Season {season.seasonNumber}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              season.monitored 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {season.monitored ? 'Monitored' : 'Not Monitored'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              season.statistics.episodeFileCount === season.statistics.totalEpisodeCount
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {season.statistics.episodeFileCount === season.statistics.totalEpisodeCount 
                ? 'Complete' 
                : `${season.statistics.episodeFileCount}/${season.statistics.totalEpisodeCount} Files`}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div>
              <span className="font-medium">Episodes:</span> {season.statistics.episodeCount}/{season.statistics.totalEpisodeCount}
            </div>
            <div>
              <span className="font-medium">Files:</span> {season.statistics.episodeFileCount}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div>
              <span className="font-medium">Progress:</span> {season.statistics.percentOfEpisodes.toFixed(1)}%
            </div>
            <div>
              <span className="font-medium">Size:</span> {(season.statistics.sizeOnDisk / (1024 * 1024 * 1024)).toFixed(2)} GB
            </div>
            {season.statistics.previousAiring && (
              <div>
                <span className="font-medium">Last Aired:</span> {new Date(season.statistics.previousAiring).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => setIsEpisodesExpanded(!isEpisodesExpanded)}
            className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
          >
            <h4 className="text-md font-medium">Episodes ({episodes.length})</h4>
            <svg
              className={`w-5 h-5 transform transition-transform ${isEpisodesExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isEpisodesExpanded && (
            <div className="mt-3">
              {isLoading ? (
                <div className="text-gray-500 text-sm">Loading episodes...</div>
              ) : episodes.length > 0 ? (
                <div className="space-y-2">
                  {episodes.map((episode) => (
                    <div key={episode.id} className="bg-gray-50 rounded p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">
                            {season.seasonNumber.toString().padStart(2, '0')}x{episode.episodeNumber.toString().padStart(2, '0')}
                          </span>
                          <span className="text-gray-900">{episode.title}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            episode.hasFile 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {episode.hasFile ? 'Downloaded' : 'Missing'}
                          </span>
                        </div>
                        <div className="text-gray-500">
                          {episode.airDate && new Date(episode.airDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Enter M3U8 URL..."
                            value={m3u8Urls[episode.id] || ''}
                            onChange={(e) => handleM3u8UrlChange(episode.id, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleDownload(episode.id)}
                            disabled={!m3u8Urls[episode.id] || isDownloading[episode.id]}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              !m3u8Urls[episode.id] || isDownloading[episode.id]
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {isDownloading[episode.id] ? 'Downloading...' : 'Download'}
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Enter save path... (e.g. /Users/michele/Downloads/video.mp4)"
                            value={downloadPaths[episode.id] || buildFilePath(episode)}
                            onChange={(e) => handleDownloadPathChange(episode.id, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        {isDownloading[episode.id] && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 w-12">{Math.round(downloadProgress[episode.id] || 0)}%</span>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${downloadProgress[episode.id] || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {episode.overview && false && (
                        <div className="mt-2 text-gray-600 text-xs">
                          {episode.overview}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No episodes found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonItem;
