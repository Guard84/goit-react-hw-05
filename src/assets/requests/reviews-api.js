import axios from "axios";

const fetchMovieReviews = async (movieId, apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
};

export default fetchMovieReviews;

