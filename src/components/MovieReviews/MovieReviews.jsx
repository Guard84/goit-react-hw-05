import { useState, useEffect } from 'react';
import fetchMovieReviews from '../../assets/requests/reviews-api';
import { useParams } from 'react-router-dom';
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchMovieReviews(movieId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p className={css.rewiewTitle}>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;