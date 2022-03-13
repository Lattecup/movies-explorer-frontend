import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {

  function setShortSavedMovies() {
    if (props.checkboxStatus === true) {
      const filteredMovies = props.savedMoviesList.filter((movie) => movie.duration <= 40);
      return filteredMovies;
    } else {
      return props.savedMoviesList;
    }
  };

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="movies">
        <SearchForm
          savedMoviesList={props.savedMoviesList} 
          handleSearch={props.handleSearch}
          checkboxStatus={props.checkboxStatus}
          handleShortMovies={props.handleShortMovies}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedMoviesList={setShortSavedMovies()}
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