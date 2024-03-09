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

  const handleMovieClick = (movieId) => {
    console.log(`Clicked movie with ID ${movieId}`);
    // Тут ви можете робити що завгодно, наприклад, переходити на сторінку з деталями фільму
  };

  return (
    <div>
      <h2>Trending Today</h2>
      <MovieList movies={trendingMovies} onItemClick={handleMovieClick} />
    </div>
  );
};

export default HomePage;
