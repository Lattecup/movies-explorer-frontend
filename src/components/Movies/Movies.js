import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="movies">
        <SearchForm
          moviesList={props.moviesList} 
          handleSearch={props.handleSearch}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesList={props.moviesList}
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