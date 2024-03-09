import { useState, useEffect } from 'react';
import fetchMovieReviews from '../../assets/requests/reviews-api';

const MovieReviews = ({ movieId, apiKey }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId, apiKey);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId, apiKey]);

  return (
    <div>
      <h2>Movie Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
