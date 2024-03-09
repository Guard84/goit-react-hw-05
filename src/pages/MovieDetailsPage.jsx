import { useParams, Outlet, Link } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  return (
    <div>
      <h2>Movie Details</h2>
      <Link to={`/movies/${movieId}/cast`}>View Cast</Link>
      <Link to={`/movies/${movieId}/reviews`}>View Reviews</Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
