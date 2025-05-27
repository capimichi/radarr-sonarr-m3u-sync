import React from 'react';

interface SearchResultProps {
  title: string;
  type: string;
  imageUrl: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ title, type, imageUrl }) => {
  return (
    <div className="flex gap-4 p-3 rounded-lg transition-colors hover:bg-white/5 cursor-pointer">
      <div className="w-15 h-15 rounded overflow-hidden flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if the main one fails to load
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/60x60?text=${title.charAt(0)}`;
          }} 
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-base m-0">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{type}</p>
      </div>
    </div>
  );
};

export default SearchResult;
