import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieCard from '../MoviesCard/MoviesCard';

function SavedMovies(props) {

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="movies">
        <SearchForm />
        <MoviesCardList>
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </MoviesCardList>
      </section>
      <Footer />
    </>
  );
};

export default SavedMovies;