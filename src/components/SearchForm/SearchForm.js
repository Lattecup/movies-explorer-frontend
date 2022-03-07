import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

  const [keyword, setKeyword] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  function handleKeyword(evt) {
    setKeyword(evt.target.value);
  };

  function handleCheck() {
    setChecked(!checked);
  }

/*
  function handleSubmit(evt) {
    evt.preventDefault();
    localStorage.setItem('keyword', keyword);
    props.handleSearch(checked);
  };

  React.useEffect(() => {
    props.handleSearch(checked);
    setKeyword(localStorage.getItem('keyword'));
  }, []);

  React.useEffect(() => {
    props.handleSearch(checked);
  }, [checked]);
  */

  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <div className="search-form__input-icon" />
        <input type="text" className="search-form__input" placeholder="Фильм" name="search" id="search" minLength="2" maxLength="30" required onChange={handleKeyword} value={keyword || ''} />
        <button type="submit" className="search-form__submit-button link" />
      </div>
      <div className="search-form__checkbox-container">
        <label className="filter-checkbox-label">
          <input type="checkbox" className="filter-checkbox-input" onChange={handleCheck}/>
          <span className="filter-checkbox-switch" />
        </label>
        <p className="search-form__paragraph">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;