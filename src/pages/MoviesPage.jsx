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
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlKeyword = searchParams.get('keyword');

  useEffect(() => {
    const handleSearch = async (query) => {
      setLoadingSearch(true);
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
      } finally {
        setLoadingSearch(false);
      }
    };

    if (urlKeyword) {
      setKeyword(urlKeyword);
      handleSearch(urlKeyword);
    }
  }, [urlKeyword]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setSearchResults(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setSearchError('Error fetching trending movies. Please try again later.');
      }
    };

    fetchTrending();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setSearchError('Please enter a movie title.');
      return;
    }
    setSearchResults([]);
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
      {loadingSearch ? (
        <p>Loading...</p>
      ) : (
        <MovieList movies={searchResults}></MovieList>
      )}
    </div>
  );
};

export default MoviesPage;
