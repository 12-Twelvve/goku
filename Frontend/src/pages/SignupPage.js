import React, { useState } from 'react';
import NavigationBar1 from '../component/NavigationBar1';
import API_URL from '../component/Config';

const SignupPage = () => {
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted with data:', formData);
    fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData), // Convert form data to JSON
  })
    .then((data) => {
      console.log('Registration successful');
      setMsg("Registration successful")
    })
    .catch((error) => {
      console.error('Error:', error);
      setMsg('Error: '+ error)
    });

  };

  return (
    <div>
      <NavigationBar1/>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {msg && <p className="error">{msg}</p>}
    </div>
  );
};

export default SignupPage;
