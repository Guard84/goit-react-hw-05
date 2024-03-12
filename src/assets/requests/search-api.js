import axios from "axios";

const fetchMoviesByKeyword = async (keyword) => {
  const url = `https://api.themoviedb.org/3/search/movie`;
  const params = {
      query: keyword,
      api_key: "aa727112dc10caa22ab6691a558de004"
  };

  try {
    const response = await axios.get(url, { params });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by keyword:", error);
    return [];
  }
};

export default fetchMoviesByKeyword;
