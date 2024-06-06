import React, { useState, useEffect } from 'react';
import Grid from '../grid/grid';

const Game = () => {
  const numRows = 30;
  const numCols = 30;

  const [grid, setGrid] = useState(Array(numRows).fill().map(() => Array(numCols).fill(false)));
  const [running, setRunning] = useState(false);

  const toggleCell = (row, col) => {
    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? !cell : cell))
    );
    setGrid(newGrid);
  };

  const getNextGeneration = (grid) => {
    const newGrid = grid.map(arr => [...arr]);
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let liveNeighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
              liveNeighbors += grid[newRow][newCol] ? 1 : 0;
            }
          }
        }
        if (grid[row][col] && (liveNeighbors < 2 || liveNeighbors > 3)) {
          newGrid[row][col] = false;
        } else if (!grid[row][col] && liveNeighbors === 3) {
          newGrid[row][col] = true;
        }
      }
    }
    return newGrid;
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setGrid(prev => getNextGeneration(prev));
    }, 100);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <Grid grid={grid} toggleCell={toggleCell} />
      <div className='game-button'>
        <button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button>
        <button onClick={() => setGrid(Array(numRows).fill().map(() => Array(numCols).fill(false)))}>Clear</button>
      </div>

    </>
  );
};

export default Game;
