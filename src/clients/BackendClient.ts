// Placeholder BackendClient
import type { SearchResult } from '../types/SearchResult';

export default class BackendClient {
  constructor(backendUrl: string) {
    console.log('Placeholder BackendClient initialized with URL:', backendUrl);
  }

  async search(term: string): Promise<SearchResult[]> {
    console.log('BackendClient search term:', term);
    return Promise.resolve([
      { title: 'Mock Movie 1', type: 'movie', image: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Movie1' },
      { title: 'Mock TV Show 1', type: 'tv', image: 'https://via.placeholder.com/150/00FF00/FFFFFF?Text=TVShow1' },
      { title: 'Mock Movie 2', type: 'movie', image: 'https://via.placeholder.com/150/0000FF/FFFFFF?Text=Movie2' }
    ]);
  }
}
