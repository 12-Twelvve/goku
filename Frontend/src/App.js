import './App.css';
import AppRouter from './component/AppRouter';
import { AuthProvider } from './component/AuthContext';
import { BoardSizeProvider } from './component/BoardsizeContext';

// main app
function App() {  
  return (
    <div className="App">
      <AuthProvider>
        <BoardSizeProvider>
          <AppRouter />
        </BoardSizeProvider>
      </AuthProvider>
    </div>
  );
}



export default App;
