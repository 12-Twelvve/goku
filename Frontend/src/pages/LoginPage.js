import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import NavigationBar1 from '../component/NavigationBar1';
import API_URL from '../component/Config';

// login page
const LoginPage = ({ onLogin }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate(); 

  const handleLogin = () => {
    console.log({username, password})
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })
      .then((data) => {
        console.log('Login successful');
        navigate('/');
        login()
        
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Invalid username or password : '+error);
      });
  };

  return (
    <div>
      <NavigationBar1/>
      <h3>Login</h3>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
