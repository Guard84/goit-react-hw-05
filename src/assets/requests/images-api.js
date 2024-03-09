import axios from "axios";
import { url, options } from "./trending-api";

const baseUrl = 'https://image.tmdb.org/t/p/w500/';

const fetchMovies = async () => {
  try {
    const response = await axios.get(url, options);
    const moviesWithFullPosterPaths = response.data.results.map(movie => ({
      ...movie,
      poster_path: baseUrl + movie.poster_path
    }));
    return moviesWithFullPosterPaths;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export default fetchMovies;
