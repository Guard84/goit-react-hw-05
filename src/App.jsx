import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from "./components/Navigation/Navigation";


function App() {


  return (
    <div>
      <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
