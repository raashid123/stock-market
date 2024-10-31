// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../Animation.json'; // Correct path to animation JSON
import Navbar from '../Navbar'; // Import Navbar


const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/stock-page'); // Navigate to the stock page
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="content">
        <h1 >All things finance,<br />right here.</h1>

        {/* Animation */}
        <div className="animation-container">
          <Lottie animationData={animationData} loop={true} style={{ width: '600px', height: '300px' }} />
        </div>

        {/* Get Started Button */}
        <button onClick={handleGetStarted} className="get-started-btn">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
