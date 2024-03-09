import { useState, useEffect } from 'react';
import fetchMovieCredits from '../../assets/requests/credits-api';

const MovieCast = ({ movieId, apiKey }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId, apiKey);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchCast();
  }, [movieId, apiKey]);

  return (
    <div>
      <h2>Movie Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;

