import React from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  function setShortMovies() {
    if (props.checkboxStatus === true) {
      const filteredMovies = props.moviesList.filter((movie) => movie.duration <= 40);
      return filteredMovies;
    } else {
      return props.moviesList;
    }
  };

  return (
    <>
      <section className="movies">
        <SearchForm
          moviesList={props.moviesList} 
          handleSearch={props.handleSearch}
          checkboxStatus={props.checkboxStatus}
          handleShortMovies={props.handleShortMovies}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesList={setShortMovies()}
            savedMoviesList={props.savedMoviesList}
            isLoading={props.isLoading}
            handleSaveMovie={props.handleSaveMovie}
            handleDeleteMovie={props.handleDeleteMovie}
            handleSearch={props.handleSearch}
          />
        )}
      </section>
      <Footer />
    </>
  );
};

export default Movies;