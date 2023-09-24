import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationBar1 from '../component/NavigationBar1';


const GameLogPage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const { isAuthenticated, login, logout } = useAuth();
  let navigate = useNavigate()
  const storedGames = JSON.parse(localStorage.getItem('history')) || [];
  const [board, setBoard] = useState(Array(storedGames[id].board_size).fill(null).map(() => Array(storedGames[id].board_size).fill(0)));
  const [effectBreak, setEffectBreak] = useState(false)
  const [effectBreakCount, seteffectBreakCount] = useState(0)
  const fillBoard =()=>{
    if (!effectBreak){
      const moves = gameDetails?.moves;
      const updatedBoard = [...board];
      moves?.forEach((move) => {
        const [row, col] = move.location;
        const playerValue = move.player === "1" ? 1 : 2;
        if (row >= 0 && row < updatedBoard.length && col >= 0 && col < updatedBoard[0].length) {
          updatedBoard[row][col] = playerValue;
        }
        setEffectBreak(true)
      });
      if(effectBreakCount>10){
        setEffectBreak(true)
      }
      seteffectBreakCount(effectBreakCount+1)
      setBoard(updatedBoard);
    }
  }
  useEffect(() => {
    if(!isAuthenticated){
      navigate("/")
    }
    setGameDetails(storedGames[id]);
  }, [id]); 
  useEffect(()=>{
    fillBoard()
    // console.log(board )
  },[board])

  return (
    <div>
      <NavigationBar1/>
      <h4>Game #{Number(id) + 1} : {gameDetails.winner? `${gameDetails.winner} win`:"Game draw"}</h4>
      <div className="board">
        {board?.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell === 1 ? 'black' : cell === 2 ? 'white' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <Link to="/games">Back to Games History</Link>
    </div>
  );
};

export default GameLogPage;
