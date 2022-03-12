import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router';

function MoviesCard(props) {

  const location = useLocation().pathname;
  const image = props.movie.image.url ? `https://api.nomoreparties.co${props.movie.image.url}` : props.movie.image;
  const duration = `${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`;

  function isSaved() {
    return props.savedMoviesList.some((i) => i.movieId === props.movie.id);
  };

  function handleSaveClick() {
    props.handleSaveMovie(props.movie);
  };

  function handleDeleteClick() {
    props.handleDeleteMovie(props.movie);
  };

  return (
    <div className="movie">
      <div className="movie__container">
        <div className="movie__info">
          <p className="movie__title">{props.movie.nameRU}</p>
          <p className="movie__duration">{duration}</p>
        </div>
        {location === '/movies' ? (
          <button type="submit" className={`movie__save-button link ${isSaved() && `movie__save-button_active`}`} onClick={isSaved() ? handleDeleteClick : handleSaveClick} />
        ) : (
          <button type="submit" className="movie__delete-button link" onClick={handleDeleteClick} />
        )}
      </div>
      <a href={props.movie.trailerLink} alt={props.movie.nameRU} target='_blank' rel="noreferrer">
        <img src={image} className="movie__image" alt="Постер фильма"/>
      </a>
    </div>
  );
};

export default MoviesCard;