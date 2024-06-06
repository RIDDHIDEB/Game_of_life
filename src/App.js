import React from 'react';
import './App.css';
import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <div className='game-header'>
        <h1>Game of Life</h1>
      </div>

      <Game />
    </div>
  );
}

export default App;
