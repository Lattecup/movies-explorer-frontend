import React from 'react';
import './MoviesCardList.css';

function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
        {props.children}
      </div>
      {props.moreButtonActive ? 
      <button type="button" aria-label="Еще" className="movies-card-list__button link">Ещё</button> : ""}
    </section>
  );
};

export default MoviesCardList;