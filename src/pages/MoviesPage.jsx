import { useState, useEffect } from 'react';
import fetchMoviesByKeyword from '../assets/requests/search-api';
import fetchTrendingMovies from '../assets/requests/trending-api';
import MovieList from '../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [loadingTrending, setLoadingTrending] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlKeyword = searchParams.get('keyword');

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setSearchResults(movies);
        setLoadingTrending(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setSearchError('Error fetching trending movies. Please try again later.');
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword);
      handleSearch(urlKeyword);
    }
  }, [urlKeyword]);

  const handleSearch = async (query) => {
    try {
      const results = await fetchMoviesByKeyword(query);
      if (results.length === 0) {
        setSearchError('No movies found.');
      } else {
        setSearchError('');
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchError('Error searching movies. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setSearchError('Please enter a movie title.');
      return;
    }
    setSearchResults([]);
    await handleSearch(keyword);
    setKeyword('');
    setSearchParams({ keyword });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Enter a movie title'
        />
        <button type="submit" className={css.btn}>Search</button>
      </form>
      {searchError && <p className={css.error}>{searchError}</p>}
      {!loadingTrending && <MovieList movies={searchResults}></MovieList>}
    </div>
  );
};

export default MoviesPage;
