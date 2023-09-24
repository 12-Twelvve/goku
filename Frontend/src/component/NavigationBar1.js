import React from 'react';
import { Link } from 'react-router-dom';
import "../style/navbar.css"

const NavigationBar1 = () => {
  // just a title
  return (
    <nav className="top-nav">
      <ul>
        <li><Link to="/">Gomoku</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar1;
