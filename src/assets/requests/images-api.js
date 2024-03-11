import axios from "axios";
import { url } from "./trending-api";

const baseUrl = 'https://image.tmdb.org/t/p/w500/';

const fetchMovies = async () => {
  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU'
    }
  };
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
