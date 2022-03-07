import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router';

function MoviesCard(props) {

  const [isSaved, setIsSaved] = React.useState(false);

  const location = useLocation();
  const image = props.movie.image.url ? `https://api.nomoreparties.co${props.movie.image.url}` : props.movie.image;
  const duration = `${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`;
  const movieSaveButtonClassName = isSaved ? 'movie__button movie__button_type_saved link' : 'movie__button movie__button_type_save link';

  function handleSaveMovieButtonActive() {
    setIsSaved(true);
  };

  function handleSaveMovieButtonInactive() {
    setIsSaved(false);
  };

  /*
  function handleSaveClick() {
    props.handleSaveMovie(props.movie);
  };

  function handleDeleteClick() {
    props.handleDeleteMovie(props.movie);
  };
  */

  return (
    <div className="movie" onMouseOver={handleSaveMovieButtonActive} onMouseOut={handleSaveMovieButtonInactive}>
      <div className="movie__container">
        <div className="movie__info">
          <p className="movie__title">{props.movie.nameRU}</p>
          <p className="movie__duration">{duration}</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button className="movie__button movie__button_type_delete link" type="button" />
        ) : (
          <button className={movieSaveButtonClassName} />
        )}
      </div>
      <a href={props.movie.trailerLink} alt={props.movie.nameRU} target='_blank' rel="noreferrer">
        <img src={image} className="movie__image" alt="Постер фильма"/>
      </a>
    </div>
  );
};

export default MoviesCard;