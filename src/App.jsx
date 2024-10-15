

import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const rows = 15;
  const cols = 20;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  const [rain, setRain] = useState(grid);

  useEffect(() => {
    const interval = setInterval(() => {
      generateRain();
    }, 500); // Adjust speed here (milliseconds)

    return () => clearInterval(interval);
  }, [rain]);

  const generateRain = () => {
    const newRain = rain.map(row => [...row]); // Create a copy of the grid

    // Shift existing drops downwards
    for (let row = rows - 1; row > 0; row--) {
      for (let col = 0; col < cols; col++) {
        newRain[row][col] = rain[row - 1][col];
      }
    }

    // Clear the top row
    for (let col = 0; col < cols; col++) {
      newRain[0][col] = null;
    }

    // Randomly decide which columns rain drops or remain blank
    for (let col = 0; col < cols; col++) {
      const shouldRain = Math.random() < 0.5; // 50% chance to rain

      if (shouldRain) {
        const color = getRandomColor();
        const dropStart = Math.floor(Math.random() * (rows - 5)); // Randomize the starting point for groups

        // Fill the vertical group of 5 with a gap
        for (let i = 0; i < 5; i++) {
          if (dropStart + i < rows) {
            newRain[dropStart + i][col] = color; // Fill the column with the same color
          }
        }
        
        // Add a gap for the next group
        const gap = Math.floor(Math.random() * 3) + 1; // Random gap of 1-3 rows
        for (let j = 0; j < gap; j++) {
          if (dropStart + 5 + j < rows) {
            newRain[dropStart + 5 + j][col] = null; // Ensure there is a gap
          }
        }
      }
    }

    setRain(newRain);
  };

  const getRandomColor = () => {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#7fff00', '#00ff00', '#00ff7f', '#00ffff', '#007fff', '#0000ff', '#7f00ff', '#ff00ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Rain Simulation</h1>
        <p>Observe the rain in bundles of five columns!</p>
      </div>
      <div className="grid">
        {rain.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((color, colIndex) => (
              <div key={colIndex} className="cell" style={{ backgroundColor: color || '#000' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
