import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './StockTable.css';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/stocks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Stock Data:', data);
        setStocks(data);
        setFilteredStocks(data);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = searchTerm
      ? stocks.filter((stock) =>
          stock.company_name && stock.company_name.toLowerCase().includes(searchTerm)
        )
      : stocks;

    setFilteredStocks(filtered);
  };

  const handleStockClick = (stock) => {
    navigate(`/stock-details/${encodeURIComponent(stock.company_name)}`);
  };

  return (
    <div className="stock-table-container">
      <div className="filter-bar">
        <label className="filter-text" htmlFor="search">Filter by company: </label>
        <div className="search-container">
          <input
            type="text"
            id="search"
            className="filter-input"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for company..."
          />
        </div>
      </div>
      <div className="table-scroll-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>COMPANY</th>
              <th>YESTERDAY OPENING</th>
              <th>YESTERDAY CLOSING</th>
              <th>TODAY HIGH</th>
              <th>TODAY LOW</th>
              <th>CURRENT VALUE</th>
            </tr>
          </thead>
          <tbody>
  {filteredStocks.length > 0 ? (
    filteredStocks.map((stock, index) => (
      <tr key={index} onClick={() => handleStockClick(stock)} style={{ cursor: 'pointer' }}>
        <td>{stock.company_name || 'N/A'}</td>
        <td>{stock.yesterday_open ? stock.yesterday_open.toFixed(2) : 'N/A'}</td>
        <td>{stock.yesterday_close ? stock.yesterday_close.toFixed(2) : 'N/A'}</td>
        <td>{stock.today_high ? stock.today_high.toFixed(2) : 'N/A'}</td>
        <td>{stock.today_low ? stock.today_low.toFixed(2) : 'N/A'}</td>
        <td>{stock.current_price ? stock.current_price.toFixed(2) : 'N/A'}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: 'center' }}>No stocks found</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default StockTable;
