import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';
import { useServices } from '../../servicesContext';
import type Series from '../../types/Series';

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
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {series && (
        <div>
          <h1>{series.title}</h1>
          <p>ID: {series.id}</p>
          {/* Add more series information as needed */}
        </div>
      )}
    </>
  );
};

export default SeriesShow;
