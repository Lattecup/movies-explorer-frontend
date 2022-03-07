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
        <SearchForm handleSearch={props.handleSearch} />
        {props.isLoading && <Preloader />}
        <MoviesCardList
          movies={props.movies}
          isLoading={props.isLoading}
        />
      </section>
      <Footer />
    </>
  );
};

export default SavedMovies;