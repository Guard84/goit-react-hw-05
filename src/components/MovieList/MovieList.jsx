import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {movies.map(movie => (
        <li className={css.moviesListItem} key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location },
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
