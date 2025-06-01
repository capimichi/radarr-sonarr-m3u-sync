import React from 'react';
import type Episode from '@/types/Episode';
import EpisodeItem from './EpisodeItem';

interface EpisodeListProps {
  episodes: Episode[];
  seasonNumber: number;
  isLoading: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  m3u8Urls: Record<number, string>;
  downloadPaths: Record<number, string>;
  downloadProgress: Record<number, number>;
  isDownloading: Record<number, boolean>;
  onM3u8UrlChange: (episodeId: number, url: string) => void;
  onDownloadPathChange: (episodeId: number, path: string) => void;
  onDownload: (episodeId: number) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  seasonNumber,
  isLoading,
  isExpanded,
  onToggleExpand,
  m3u8Urls,
  downloadPaths,
  downloadProgress,
  isDownloading,
  onM3u8UrlChange,
  onDownloadPathChange,
  onDownload,
}) => {
  return (
    <div className="mt-4 border-t pt-4">
      <button
        onClick={onToggleExpand}
        className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
      >
        <h4 className="text-md font-medium">Episodes ({episodes.length})</h4>
        <svg
          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-3">
          {isLoading ? (
            <div className="text-gray-500 text-sm">Loading episodes...</div>
          ) : episodes.length > 0 ? (
            <div className="space-y-2">
              {episodes.map((episode) => (
                <EpisodeItem
                  key={episode.id}
                  episode={episode}
                  seasonNumber={seasonNumber}
                  m3u8Url={m3u8Urls[episode.id] || ''}
                  downloadPath={downloadPaths[episode.id] || ''}
                  isDownloading={isDownloading[episode.id] || false}
                  downloadProgress={downloadProgress[episode.id] || 0}
                  onM3u8UrlChange={(url) => onM3u8UrlChange(episode.id, url)}
                  onDownloadPathChange={(path) => onDownloadPathChange(episode.id, path)}
                  onDownload={() => onDownload(episode.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No episodes found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
