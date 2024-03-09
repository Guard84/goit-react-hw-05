import axios from "axios";

const fetchMovieCredits = async (movieId, apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
};

export default fetchMovieCredits;

