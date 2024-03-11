import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchMovieDetails from '../assets/requests/details-api.js';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [movieId]);

  const backLinkHref = location.state?.from ?? "/";

  return (
    <div>
      <Link to={backLinkHref}>Go Back</Link>
      {movieDetails ? (
        <div>
          {movieDetails.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt="Movie Poster"
            />
          )}
          <h3>{movieDetails.title}</h3>
          <p>Overview: {movieDetails.overview}</p>
          <p>User Score: {movieDetails.vote_count}%</p>
          <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <p>Additional Information</p>
        <Link to={`/movies/${movieId}/cast`}>View Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>View Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
