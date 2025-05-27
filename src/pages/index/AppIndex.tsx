import React, { useState } from 'react';
import Search from '../../components/search/Search';

const AppIndex: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Mock results for demonstration
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Mock data - in a real app would come from API
    const mockResults = [
      { id: 1, title: 'The Midnight Hour', type: 'TV Show', imageUrl: '/images/midnight.jpg' },
      { id: 2, title: 'The Silent Sea', type: 'Movie', imageUrl: '/images/sea.jpg' },
      { id: 3, title: 'Echoes of the Past', type: 'TV Show', imageUrl: '/images/echoes.jpg' },
      { id: 4, title: 'The Last Frontier', type: 'Movie', imageUrl: '/images/frontier.jpg' },
      { id: 5, title: 'City of Dreams', type: 'TV Show', imageUrl: '/images/city.jpg' },
      { id: 6, title: 'The Hidden Truth', type: 'Movie', imageUrl: '/images/truth.jpg' }
    ];
    
    setSearchResults(mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    ));
  };
  
  return (
    <div className="min-h-screen">
      <main>
        <Search onSearch={handleSearch} results={searchResults} />
      </main>
    </div>
  );
};

export default AppIndex;
