import { useState, useEffect } from 'react';
import fetchMovieCredits from '../../assets/requests/credits-api';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500/';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            {actor.profile_path && (
              <img
                src={`${baseUrl}${actor.profile_path}`}
                alt={actor.name}
                style={{ width: '100px', height: '150px' }}
              />
            )}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
