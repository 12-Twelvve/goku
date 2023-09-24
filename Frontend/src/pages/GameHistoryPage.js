import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar1 from '../component/NavigationBar1';
import API_URL from '../component/Config';

const GamesHistoryPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const previousGames = JSON.parse(localStorage.getItem('previousGames')) || [];
    // setGames(previousGames);
    // call the previous played games
    fetch(`${API_URL}/games`, {
      method: 'GET',
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // console.log('game history : ', data);
      setGames(data)
      localStorage.setItem('history', JSON.stringify(data));

    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div>
      {/* games list  */}
      <NavigationBar1/>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
          Game #{index + 1} - @{game.createdAt} . {game.winner? `${game.winner} win`:"Game draw" } - 
          <Link to={`/gamelog/${index}`}>View Detail</Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesHistoryPage;
