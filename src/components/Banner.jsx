import React from 'react';

import LinkInfo from './LinkInfo';
import logo from '../assets/images/24_white.png';

import './App.css';

const Banner = () => (
  <div className="Banner">
    <LinkInfo />
    <div className="AppPromo">
      <img className="Logo" src={logo} alt="" />
      <div>
        Want notifications? <a href="https://xg9d6.app.goo.gl/24">Get the app!</a>
      </div>
    </div>
  </div>
);

export default Banner;
