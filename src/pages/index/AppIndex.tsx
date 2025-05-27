import React, { useState, useCallback } from 'react';
import AppLayout from '../../layouts/AppLayout';
import { useServices } from '../../servicesContext';
import type { SearchResult } from '../../types/SearchResult';

const AppIndex: React.FC = () => {
  const { searchService } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchService.search(searchTerm);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to fetch search results.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchService]);

  return (
    <AppLayout>
      <div className="app-index-page p-4"> {/* Added p-4 for basic padding */}
        <h1 className="text-2xl font-bold mb-4">Search Media</h1>
        <div className="search-controls mb-4 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term (e.g., movie title)"
            className="border p-2 rounded-l w-full" // Basic styling
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-gray-400" // Basic styling
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="search-results mt-6">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
                  <img 
                    src={result.image || 'https://via.placeholder.com/300x450/CCCCCC/FFFFFF?Text=No+Image'} 
                    alt={result.title} 
                    className="w-full h-64 object-cover" // Fixed height, object-cover
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-1 text-gray-800">{result.title}</h2>
                    <p className="text-sm text-gray-600 capitalize bg-gray-200 inline-block px-2 py-1 rounded">
                      {result.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && searchTerm && <p className="text-center text-gray-500 mt-10">No results found for "{searchTerm}".</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AppIndex;
