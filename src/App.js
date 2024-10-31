import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
import StockTable from './components/StockTable'; // Import StockTable component
import StockDetails from './components/StockDetails'; // Import StockDetails component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Define the route for StockPage */}
          <Route path="/stock-page" element={<StockPage />} />

          {/* Define the route for the StockTable */}
          <Route path="/stock-table" element={<StockTable />} />

          {/* Define the route for StockDetails with a ticker parameter */}
          <Route path="/stock-details/:companyName" element={<StockDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
