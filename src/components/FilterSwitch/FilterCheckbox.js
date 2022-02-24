import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isFiltered, setIsFiltered] = React.useState(false);
  const onFilter = () => setIsFiltered(!isFiltered);

  return (
    <label className="filter-checkbox-label">
      <input type="checkbox" className="filter-checkbox-input" checked={isFiltered} onChange={onFilter} />
      <span className="filter-checkbox-switch" />
    </label>
  );
};

export default FilterCheckbox;