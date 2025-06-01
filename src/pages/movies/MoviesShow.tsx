import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';

interface Movie {
  id: number;
  title: string;
  year: number;
  // Add other movie properties as needed
}

const MoviesShow: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Placeholder for API call to fetch movies
    const fetchMovies = async () => {
      try {
        // Replace with actual API call
        // const response = await movieService.getMovies();
        // setMovies(response.data);
        
        // Dummy data for now
        setMovies([
          { id: 1, title: 'Sample Movie 1', year: 2023 },
          { id: 2, title: 'Sample Movie 2', year: 2022 },
        ]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <AppLayout>
      <div className="movies-page">
        <h1>Movies</h1>
        
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div className="movies-grid">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p>Year: {movie.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MoviesShow;
