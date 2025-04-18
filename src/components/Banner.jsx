import React from 'react';
import Car from './Car'; // Carousel component
import bg from '../assets/bg-img.jpg';

function Banner() {
  return (
    <div
      className="text-white d-flex flex-column justify-content-between"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '4rem 1rem',
      }}
    >
      {/* Top text content */}
      <div className="container text-center">
        <h1 className="fw-bold display-4">Explore the Crypto World</h1>
        <p className="lead">Live coin updates and market trends with stunning visuals</p>
      </div>

      {/* Carousel inside background image section, at bottom */}
      <div className="container mt-auto">
        <Car />
      </div>
    </div>
  );
}

export default Banner;
