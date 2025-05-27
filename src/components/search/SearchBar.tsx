import React from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onQueryChange }) => {
  return (
    <div className="my-5">
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          className="w-full py-4 pl-12 pr-4 rounded-lg border-none bg-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search for TV shows or movies"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
