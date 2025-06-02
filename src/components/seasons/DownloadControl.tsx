import React from 'react';
import type Episode from '@/types/Episode';

interface DownloadControlProps {
  episode: Episode;
  m3u8Url: string;
  downloadPath: string;
  isDownloading: boolean;
  downloadProgress: number;
  onM3u8UrlChange: (url: string) => void;
  onDownloadPathChange: (path: string) => void;
  onDownload: () => void;
}

const DownloadControl: React.FC<DownloadControlProps> = ({
  episode,
  m3u8Url,
  downloadPath,
  isDownloading,
  downloadProgress,
  onM3u8UrlChange,
  onDownloadPathChange,
  onDownload,
}) => {
  
  return (
    <div className="mt-3 space-y-2" data-id={`download-control-${episode.id}`}>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter M3U8 URL..."
          value={m3u8Url}
          onChange={(e) => onM3u8UrlChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={onDownload}
          disabled={!m3u8Url || isDownloading}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !m3u8Url || isDownloading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter save path... (e.g. /Users/michele/Downloads/video.mp4)"
          value={downloadPath}
          onChange={(e) => onDownloadPathChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {isDownloading && (
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600 w-12">
            {Math.round(downloadProgress) || 0}%
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(downloadProgress) || 0}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadControl;
