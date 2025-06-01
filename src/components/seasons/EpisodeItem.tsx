import React from 'react';
import type Episode from '@/types/Episode';
import DownloadControl from './DownloadControl';

interface EpisodeItemProps {
  episode: Episode;
  seasonNumber: number;
  m3u8Url: string;
  downloadPath: string;
  isDownloading: boolean;
  downloadProgress: number;
  onM3u8UrlChange: (url: string) => void;
  onDownloadPathChange: (path: string) => void;
  onDownload: () => void;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({
  episode,
  seasonNumber,
  m3u8Url,
  downloadPath,
  isDownloading,
  downloadProgress,
  onM3u8UrlChange,
  onDownloadPathChange,
  onDownload,
}) => {
  return (
    <div className="bg-gray-50 rounded p-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-medium">
            {seasonNumber.toString().padStart(2, '0')}x{episode.episodeNumber.toString().padStart(2, '0')}
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
      
      <DownloadControl
        episode={episode}
        m3u8Url={m3u8Url}
        downloadPath={downloadPath}
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
        onM3u8UrlChange={onM3u8UrlChange}
        onDownloadPathChange={onDownloadPathChange}
        onDownload={onDownload}
      />

      {episode.overview && false && (
        <div className="mt-2 text-gray-600 text-xs">
          {episode.overview}
        </div>
      )}
    </div>
  );
};

export default EpisodeItem;
