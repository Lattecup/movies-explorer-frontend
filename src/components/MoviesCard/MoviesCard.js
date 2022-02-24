import React from 'react';
import './MoviesCard.css';
import movie from '../../images/movie.png';
import { useLocation } from 'react-router';

function MoviesCard(props) {
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);

  function handleSaveMovie() {
    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  };

  return (
    <div className="movie">
      <div className="movie__container">
        <div className="movie__info">
          <p className="movie__title">33 слова о дизайне</p>
          <p className="movie__duration">1ч 47м</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button className="movie__button movie__button_type_delete link" type="button" />
        ) : (
          <button onClick={handleSaveMovie} className={isSaved ? 'movie__button movie__button_type_saved link' : 'movie__button movie__button_type_save link'}></button>
        )}
      </div>
      <img src={movie} className="movie__image" alt="Постер фильма"/>
    </div>
  );
};

export default MoviesCard;