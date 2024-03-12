import { useState, useEffect } from 'react';
import fetchMovieCredits from '../../assets/requests/credits-api';
import { useParams } from 'react-router-dom';
import css from "./MovieCast.module.css";

const baseUrl = 'https://image.tmdb.org/t/p/w500/';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
        setError('Error fetching movie cast. Please try again later.');
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul className={css.castList}>
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
