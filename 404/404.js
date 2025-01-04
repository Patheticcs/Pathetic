import React from 'react';
import './404.css';

const Custom404 = () => {
  return (
    <div className="error-container">
      <video
        autoplay
        muted
        loop
        playsInline
        preload="auto"
        id="background-video"
        aria-hidden="true"
      >
        <source
          src="https://r2.ammo.lol/1733dba4-f59c-48d2-b1c2-6e8620dee401.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="container" aria-label="404 error container">
        <h1>404</h1>
        <p>Oops! The page you're looking for is not here.</p>
        <a href="/" aria-label="Go back to the home page">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default Custom404;
