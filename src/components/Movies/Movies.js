import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieCard from '../MoviesCard/MoviesCard';

function Movies(props) {
  const [moreButtonActive, setMoreButtonActive] = React.useState(false);

  React.useEffect(() => {
    setMoreButtonActive(true);
  }, []);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="movies">
        <SearchForm />
        <MoviesCardList moreButtonActive={moreButtonActive}>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </MoviesCardList>
      </section>
      <Footer />
    </>
  );
};

export default Movies;