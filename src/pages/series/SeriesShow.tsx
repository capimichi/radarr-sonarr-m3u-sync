import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';
import { useServices } from '../../servicesContext';
import type Series from '../../types/Series';
import SeasonItem from '../../components/seasons/SeasonItem';

const SeriesShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { seriesService } = useServices();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        if (!id) return;
        const seriesData = await seriesService.getSeriesById(parseInt(id, 10));
        setSeries(seriesData);
      } catch (err) {
        setError('Failed to load series data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id, seriesService]);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {series && (
        <div className="space-y-8">
          {/* Main content: Image + Details */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Column */}
            <div className="flex-shrink-0">
              {series.images && series.images.length > 0 ? (
                <img
                  src={series.images.find(img => img.coverType === 'poster')?.remoteUrl || series.images[0].remoteUrl}
                  alt={series.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-64 h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{series.title}</h1>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Status:</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {series.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Year:</span>
                  <span className="ml-2">{series.year}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Episode Count:</span>
                  <span className="ml-2">{series.statistics.episodeCount}/{series.statistics.totalEpisodeCount}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">File Count:</span>
                  <span className="ml-2">{series.statistics.episodeFileCount}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Progress:</span>
                  <span className="ml-2">{series.statistics.percentOfEpisodes.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Size on Disk:</span>
                  <span className="ml-2">{(series.statistics.sizeOnDisk / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                </div>
              </div>

              {series.overview && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{series.overview}</p>
                </div>
              )}

              <div className="text-sm text-gray-500">
                <p><span className="font-semibold">Path:</span> {series.path}</p>
                <p><span className="font-semibold">Root Folder:</span> {series.rootFolderPath}</p>
                {series.statistics.previousAiring && (
                  <p><span className="font-semibold">Previous Airing:</span> {new Date(series.statistics.previousAiring).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>

          {/* Seasons Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasons</h2>
            <div className="space-y-3">
              {series.seasons.map((season) => (
                <SeasonItem key={season.seasonNumber} season={season} series={series} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeriesShow;
