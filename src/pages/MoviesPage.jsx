import { useState, useEffect } from 'react';
import fetchMoviesByKeyword from '../assets/requests/search-api';
import MovieList from '../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [submitKeyword, setSubmitKeyword] = useState('');
  const [searchParams] = useSearchParams();

  const urlKeyword = searchParams.get('keyword');

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword);
      setSubmitKeyword(urlKeyword);
    }
  }, [urlKeyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitKeyword(keyword);
  };

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const results = await fetchMoviesByKeyword(submitKeyword);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    if (submitKeyword) {
      getSearchResults();
    }
  }, [submitKeyword]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
