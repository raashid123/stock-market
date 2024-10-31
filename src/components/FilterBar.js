import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="filter-bar">
      <span>FILTER :</span>
      <button className={filter === 'COMPANY' ? 'active' : ''} onClick={() => setFilter('COMPANY')}>
        COMPANY
      </button>
      <button className={filter === 'INDEX' ? 'active' : ''} onClick={() => setFilter('INDEX')}>
        INDEX
      </button>
    </div>
  );
};

export default FilterBar;
