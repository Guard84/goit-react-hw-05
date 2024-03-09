
import { useState } from 'react';
import fetchMoviesByKeyword from '../assets/requests/search-api';
import MovieList from '../components/MovieList/MovieList';

const MoviesPage = ({ apiKey }) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await fetchMoviesByKeyword(keyword, apiKey);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
