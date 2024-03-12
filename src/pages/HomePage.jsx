import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import fetchTrendingMovies from "../assets/requests/trending-api.js";
import MovieList from '../components/MovieList/MovieList.jsx';
import fetchMovieDetails from '../assets/requests/details-api.js';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = async (movieId) => {
    try {
      const movieDetails = await fetchMovieDetails(movieId);
      return <Link to={`/movies/${movieId}`} state={{ movieDetails }} />;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }

  };
  return (
    <div>
      <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Trending Today</h1>
      <MovieList movies={trendingMovies} onItemClick={handleMovieClick} />
    </div>
  );
};

export default HomePage;
