import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'; 
import LoginPage from '../pages/LoginPage';
import GamePage from '../pages/GamePage';
import GameHistoryPage from '../pages/GameHistoryPage';
import GameHistoryDetailPage from '../pages/GameHistoryDetailPage';
import SignupPage from '../pages/SignupPage';

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/games" element={<GameHistoryPage />} />
            <Route path="/gamelog/:id" element={<GameHistoryDetailPage />} />
        </Routes>
    </Router>
  );
};

export default AppRouter;
