import React from 'react';
import { useLocation } from 'react-router';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {

  const location = useLocation().pathname;

  const [moviesList, setMoviesList] = React.useState([]);
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [addMoviesCount, setAddMoviesCount] = React.useState(0);
  const [isButtonActive, setIsButtonActive] = React.useState(false);

  function handleMoviesList() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setMoviesCount(12);
      setAddMoviesCount(3);
    } else if (screenWidth >= 768) {
      setMoviesCount(8);
      setAddMoviesCount(2);
    } else {
      setMoviesCount(5);
      setAddMoviesCount(2);
    }
  };

  function handleMoreButtonClick() {
    setMoviesList(props.movies.slice(0, moviesList.length + addMoviesCount));
    if (moviesList.length >= props.movies.length - addMoviesCount) {
      setIsButtonActive(false);
    };
  };

  React.useEffect(() => {
    handleMoviesList();
  });

  React.useEffect(() => {
    if (location === '/movies') {
      setMoviesList(props.movies.slice(0, moviesCount));
      if (props.movies.length <= moviesCount) {
        setIsButtonActive(false);
      } else {
        setIsButtonActive(true);
      }
    } else {
      setMoviesList(props.movies);
      setIsButtonActive(false);
    }
  }, [location, moviesCount, props.movies]);


  return (
    <section className="movies-card-list">
      {props.movies.length === 0 ? 
        <span className="movies-card-list__span_active">{props.moviesMessage}</span> :
        <div className="movies-card-list__container">
        {moviesList.map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            handleSaveMovie={props.handleSaveMovie}
          />
        ))}
      </div>
      }
      {isButtonActive &&
      <button type="button" aria-label="Еще" className="movies-card-list__button link" onClick={handleMoreButtonClick}>Ещё</button>
      }
    </section>
  );
};

export default MoviesCardList;