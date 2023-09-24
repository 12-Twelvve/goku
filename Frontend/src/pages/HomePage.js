import React, {useState} from 'react';
import NavigationBar from '../component/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import { useBoardSize } from '../component/BoardsizeContext';
import API_URL from '../component/Config';

const HomePage = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { boardSize, setBoardSize } = useBoardSize();
  const [game_state, setGame_state] = useState({});

  let navigate = useNavigate()
  const handleStartGame = () => {
    if(isAuthenticated){
      fetch(`${API_URL}/game/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"moves":[],"board_size":boardSize, "winner":null}),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('game successfully created !', data._id);
        navigate(`/game/${data._id}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    else{
      navigate("/login")
    }
  };

  const handleBoardSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setBoardSize(newSize);
  };

  return (
    <div>
      <NavigationBar/>
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div>
            <label>Board Size: </label>
            <select value={boardSize} onChange={handleBoardSizeChange}>
              {Array.from({ length: 11 }, (_, index) => index + 5).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {/* <input type="number" min={5} max={19} step={1} value={boardSize} onChange={handleBoardSizeChange} /> */}
        </div>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
};

export default HomePage;
