import React from 'react';
import { useLocation } from 'react-router';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  
  const location = useLocation().pathname;
  const keywordValue = localStorage.getItem('keyword');
  const [keyword, setKeyword] = React.useState(keywordValue && location === '/movies' ? keywordValue : '');

  function handleKeyword(evt) {
    setKeyword(evt.target.value);
    if (location === '/movies') {
      localStorage.setItem('keyword', evt.target.value);
    };
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (location === '/movies') {
      props.handleSearch(props.moviesList, keyword);
    } else {
      props.handleSearch(props.savedMoviesList, keyword);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <div className="search-form__input-icon" />
        <input type="text" className="search-form__input" placeholder="Фильм" name="search" id="search" minLength="2" maxLength="30" required onChange={handleKeyword} value={keyword} />
        <button type="submit" className="search-form__submit-button link" onSubmit={handleSubmit}/>
      </div>
      <div className="search-form__checkbox-container">
        <FilterCheckbox
          checkboxStatus={props.checkboxStatus}
          handleShortMovies={props.handleShortMovies}
        />
        <p className="search-form__paragraph">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;