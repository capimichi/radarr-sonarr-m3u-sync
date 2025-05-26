import React, { useEffect, useState } from 'react';
import AppLayout from '../../layouts/AppLayout';

interface Series {
  id: number;
  title: string;
  year: number;
  // Add other series properties as needed
}

const SeriesShow: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Placeholder for API call to fetch series
    const fetchSeries = async () => {
      try {
        // Replace with actual API call
        // const response = await seriesService.getSeries();
        // setSeries(response.data);
        
        // Dummy data for now
        setSeries([
          { id: 1, title: 'Sample Series 1', year: 2023 },
          { id: 2, title: 'Sample Series 2', year: 2022 },
        ]);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  return (
    <AppLayout>
      <div className="series-page">
        <h1>TV Series</h1>
        
        {loading ? (
          <p>Loading series...</p>
        ) : (
          <div className="series-grid">
            {series.map(show => (
              <div key={show.id} className="series-card">
                <h3>{show.title}</h3>
                <p>Year: {show.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SeriesShow;
