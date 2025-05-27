import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

interface SearchProps {
  onSearch: (query: string) => void;
  results: any[];
}

const Search: React.FC<SearchProps> = ({ onSearch, results }) => {
  const [query, setQuery] = useState<string>('');
  
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    onSearch(newQuery);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-5">
      <SearchBar query={query} onQueryChange={handleQueryChange} />
      
      {results.length > 0 && (
        <div>
          <h2 className="text-xl mt-8 mb-5">Results</h2>
          <div className="flex flex-col gap-4">
            {results.map(item => (
              <SearchResult 
                key={item.id} 
                title={item.title} 
                type={item.type} 
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
