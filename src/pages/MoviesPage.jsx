import { useState, useEffect } from 'react';
import fetchMoviesByKeyword from '../assets/requests/search-api';
import MovieList from '../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import css from "./MoviesPage.module.css";

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
      <form onSubmit={handleSearch} className={css.form}>
        <input
          className={css.input}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Enter a movie title'
        />
        <button type="submit" className={css.btn}>Search</button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
