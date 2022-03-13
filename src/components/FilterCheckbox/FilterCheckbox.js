import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {

  return (
    <label className="filter-checkbox-label">
      <input type="checkbox" className="filter-checkbox-input" checked={props.checkboxStatus === true ? true : false} onClick={props.handleShortMovies} />
      <span className="filter-checkbox-switch" />
    </label>
  );
};

export default FilterCheckbox;