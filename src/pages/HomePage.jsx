import { useState, useEffect } from "react";
import fetchTrendingMovies from "../assets/requests/trending-api.js";
import MovieList from '../components/MovieList/MovieList.jsx';

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
      window.location.href = `/movies/${movieId}`;
    } catch (error) {
      console.error("Error handling movie click:", error);
    }
  };

  return (
    <div>
      <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Trending Today</h1>
      {trendingMovies.length > 0 ? (
        <MovieList movies={trendingMovies} onItemClick={handleMovieClick} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
