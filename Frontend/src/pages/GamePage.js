import React, {useEffect} from 'react'
import GomokuGame from '../component/GomokuGame'
import { useAuth } from '../component/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar1 from '../component/NavigationBar1';

// game page
function GamePage() {
  const { isAuthenticated, login, logout } = useAuth();
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/")
    }
    },[])
  return (
    <div>
      <NavigationBar1/>
      <GomokuGame id ={id}/>
    </div>
  )
}

export default GamePage
