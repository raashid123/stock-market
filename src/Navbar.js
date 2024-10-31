import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Finance Portal</h2>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">HOME</Link>
        <Link to="/stock-page" className="nav-link">STOCKS</Link>
      </div>
    </nav>
  );
};

export default Navbar;
