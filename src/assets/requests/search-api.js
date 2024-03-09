import axios from "axios";

const fetchMoviesByKeyword = async (keyword, apiKey) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`;
  const options = {
    params: {
      api_key: `${apiKey}`
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by keyword:", error);
    return [];
  }
};

export default fetchMoviesByKeyword;
