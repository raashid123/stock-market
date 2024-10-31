// src/pages/StockPage.js

import React from 'react';
import Navbar from '../Navbar'; // Assuming you have the Navbar component
import StockTable from '../components/StockTable'; // Assuming you have StockTable
import FilterBar from '../components/FilterBar';

const StockPage = () => {
  const [filter, setFilter] = React.useState('COMPANY');

  return (
    <div className="stock-page">
      {/* Reuse the Navbar here */}
      <Navbar />

      {/* Filter Bar Component */}
      <FilterBar filter={filter} setFilter={setFilter} />

      {/* Stock Table Component */}
      <StockTable filter={filter} />
    </div>
  );
};

export default StockPage;
