import axios from "axios";

const fetchTrendingMovies = async () => {
  const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTcyNzExMmRjMTBjYWEyMmFiNjY5MWE1NThkZTAwNCIsInN1YiI6IjY1ZTZmNmM5NjMzMmY3MDE3YzkxYTQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J5lYpWygdy19FoumUtmuiDFtb7Jp_vkTrSUL8s60MJU";
  const url = 'https://api.themoviedb.org/3/trending/movie/day';
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export default fetchTrendingMovies;



