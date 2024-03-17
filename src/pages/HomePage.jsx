import { useState, useEffect } from "react";
import fetchTrendingMovies from "../assets/requests/trending-api.js";
import MovieList from '../components/MovieList/MovieList.jsx';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError('Error fetching trending movies. Please try again later.');
      } finally {
        setLoading(false);
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MovieList movies={trendingMovies} onItemClick={handleMovieClick} />
      )}
    </div>
  );
};

export default HomePage;
