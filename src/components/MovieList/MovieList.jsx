import { Link } from 'react-router-dom';
import css from './MovieList.module.css';


const MovieList = ({ movies }) => {
  return (
    <ul className={css.moviesList}>
      {movies.map(movie => (
        <li className={css.moviesListItem} key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
