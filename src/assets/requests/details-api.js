import axios from "axios";

const fetchMovieDetails = async (movieId, apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const options = {
    headers: {
      Authorization: `${apiKey}`
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export default fetchMovieDetails;
