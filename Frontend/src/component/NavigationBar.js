import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style/navbar.css"
import { useAuth } from './AuthContext';


const NavigationBar = () => {
  const { isAuthenticated, login, logout } = useAuth();
  let navigate = useNavigate()
  const handlelogout = ()=>{
    logout()
    navigate("/")
  }
  return (
    <nav className="top-nav">
      <ul>
        <li><Link to="/">Gomoku</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/games">Game History</Link></li>
            <li onClick={handlelogout}>logout</li>
          </>
        ) : (
          <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
