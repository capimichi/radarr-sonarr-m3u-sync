import React, { useState, useEffect } from 'react';
import { useServices } from '../../servicesContext';
import type SearchResult from '../../types/SearchResult';
import type SearchResponse from '../../types/response/SearchResponse';
import { Link } from 'react-router-dom';


interface SearchProps {
  
}

const Search: React.FC<SearchProps> = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchService } = useServices();

  useEffect(() => {
    const performSearch = async () => {
      if (query.length >= 3) {
        setIsLoading(true);
        try {
          const searchResponse: SearchResponse = await searchService.search(query);
          setResults(searchResponse.results);
        } catch (error) {
          console.error('Errore durante la ricerca:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, searchService]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca film o serie TV..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query.length > 0 && query.length < 3 && (
          <p className="text-sm text-gray-500 mt-1">Inserisci almeno 3 caratteri per cercare</p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>Caricamento risultati...</p>
        </div>
      ) : (
        results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Risultati della ricerca</h2>
            <ul className="divide-y divide-gray-200">
              {results.map((result, index) => (
                <li key={index} className="py-4 flex">
                  <div className="h-auto w-32 flex-shrink-0">
                    {result.image && (
                      <img 
                        src={result.image} 
                        alt={result.title} 
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    {result.type === 'series' ? (
                      <Link to={`/app/series/${result.id}/show`} className="hover:text-blue-600">
                        <h3 className="font-medium">{result.title}</h3>
                      </Link>
                    ) : (
                      <h3 className="font-medium">{result.title}</h3>
                    )}
                    <p className="text-sm text-gray-500">
                      {result.type === 'movie' ? 'Film' : 'Serie TV'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {!isLoading && query.length >= 3 && results.length === 0 && (
        <p className="text-center py-4">Nessun risultato trovato</p>
      )}
    </div>
  );
};

export default Search;
