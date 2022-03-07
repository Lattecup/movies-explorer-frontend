import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {

  function handleClick() {
    props.onCheck();
  }

  return (
    <label className="filter-checkbox-label">
      <input type="checkbox" className="filter-checkbox-input" />
      <span className="filter-checkbox-switch" />
    </label>
  );
};

export default FilterCheckbox;