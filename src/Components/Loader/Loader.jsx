'use client'

import React from 'react';
import Lottie from 'lottie-react';
import preloaderAnimation from '../../assets/animation/preloader.json';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        <Lottie
          animationData={preloaderAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
        <p className="loader-text">AWS Cloud Clubs - SRMIST</p>
      </div>
    </div>
  );
};

export default Loader;
