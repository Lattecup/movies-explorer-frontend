import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="movies">
        <SearchForm
          savedMoviesList={props.savedMoviesList} 
          handleSearch={props.handleSearch}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedMoviesList={props.savedMoviesList}
            isLoading={props.isLoading}
            handleDeleteMovie={props.handleDeleteMovie}
            handleSearch={props.handleSearch}
        />          
        )}
      </section>
      <Footer />
    </>
  );
};

export default SavedMovies;