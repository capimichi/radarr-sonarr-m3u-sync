import React from 'react';
import type Season from '../../types/Season';

interface SeasonHeaderProps {
  season: Season;
}

const SeasonHeader: React.FC<SeasonHeaderProps> = ({ season }) => {
  return (
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
  );
};

export default SeasonHeader;
