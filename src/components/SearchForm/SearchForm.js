import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterSwitch/FilterCheckbox';

function SearchForm() {

  function handleSubmit(evt) {
    evt.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <div className="search-form__input-icon" />
        <input type="text" className="search-form__input" placeholder="Фильм" name="search" id="search-input" required />
        <button type="submit" className="search-form__submit-button link" />
      </div>
      <div className="search-form__checkbox-container">
        <FilterCheckbox />
        <p className="search-form__paragraph">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;