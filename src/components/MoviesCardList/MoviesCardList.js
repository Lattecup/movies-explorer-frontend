import React from 'react';
import { useLocation } from 'react-router';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {

  const location = useLocation().pathname;

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const isLaptop = screenWidth > 1279;
  const isTablet = screenWidth > 767 && screenWidth < 1279;
  const [moviesCount, setMoviesCount] = React.useState(12);

  React.useEffect(() => {
    setMoviesCount(isLaptop ? 12 : isTablet ? 8 : 5)
  }, [screenWidth]);

  function updateWindowSize() {
    setTimeout(() => {
      setScreenWidth(window.innerWidth);
    }, 1000)
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  });

  function handleMoreButtonClick() {
    isLaptop ? setMoviesCount(moviesCount + 3) :
    isTablet ? setMoviesCount(moviesCount + 2) :
               setMoviesCount(moviesCount + 2);
  };

  return (
    <section className="movies-card-list">
      {location === '/movies' && props.moviesList.length === 0 ? (
        <span className="movies-card-list__span_active">Ничего не найдено</span>
      ) : location === '/saved-movies' && props.savedMoviesList.length === 0 ? (
        <span className="movies-card-list__span_active">Ничего не найдено</span>
      ) : ('')
      }
      <div className="movies-card-list__container">
        {location === '/movies' && props.moviesList && props.moviesList.map((movie, index) => {
          if (index + 1 <= moviesCount) {
            return (
              <MoviesCard
                key={index}
                movie={movie}
                savedMoviesList={props.savedMoviesList}
                handleSaveMovie={props.handleSaveMovie}
                handleDeleteMovie={props.handleDeleteMovie}
            />
            );
          } else {
            return '';
          }
        })}{''}
        {location === '/saved-movies' && props.savedMoviesList && props.savedMoviesList.map((movie, index) => {
          if (index + 1 <= moviesCount) {
            return (
              <MoviesCard
                key={index}
                movie={movie}
                savedMoviesList={props.savedMoviesList}
                handleDeleteMovie={props.handleDeleteMovie}
              />
            );
          } else {
            return '';
          }
        })}
      </div>
      {location === '/movies' && moviesCount < props.moviesList.length && (
        <button type="button" aria-label="Ещё" className="movies-card-list__button link" onClick={handleMoreButtonClick}>Ещё</button>
      )}
      {location === '/saved-movies' && moviesCount < props.savedMoviesList.length && (
        <button type="button" aria-label="Ещё" className="movies-card-list__button link" onClick={handleMoreButtonClick}>Ещё</button>
      )}
    </section>
  );
};

export default MoviesCardList;