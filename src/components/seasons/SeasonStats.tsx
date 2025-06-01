import React from 'react';
import type Season from '../../types/Season';

interface SeasonStatsProps {
  season: Season;
}

const SeasonStats: React.FC<SeasonStatsProps> = ({ season }) => {
  return (
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
  );
};

export default SeasonStats;
