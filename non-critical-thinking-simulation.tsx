import React, { useState, useEffect, useRef } from 'react';

const SocietySimulation = () => {
  // Grid size and cell size
  const rows = 50;
  const cols = 50;
  const cellSize = 10;
  
  // Parameters with initial values
  const [params, setParams] = useState({
    initialCriticalThinkers: 30, // percentage
    influenceRadius: 2,
    mediaInfluence: 3, // strength of media influence
    educationStrength: 5, // strength of educational influence
    confirmationBias: 4, // tendency to accept ideas that match existing beliefs
    randomEvents: true,
    running: false,
    speed: 200, // ms between updates
  });
  
  // Society state
  const [grid, setGrid] = useState([]);
  const [generation, setGeneration] = useState(0);
  const [stats, setStats] = useState({
    criticalThinkers: 0,
    nonCriticalThinkers: 0,
  });
  
  // Color palette for visualization
  const colors = {
    criticalThinker: '#1E88E5', // blue
    nonCriticalThinker: '#E53935', // red
    background: '#F5F5F5', // light gray
  };
  
  // Media messages that appear periodically
  const mediaMessages = [
    "BREAKING: Study shows chocolate prevents cancer!",
    "VIRAL: Celebrity endorses miracle weight loss pill!",
    "SHOCKING: Government hiding alien contact!",
    "ALERT: New conspiracy theory gaining followers!",
    "TRENDING: Unverified health advice spreading online!",
  ];
  
  const [currentMediaMessage, setCurrentMediaMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  
  // Initialize society
  const initializeGrid = () => {
    const newGrid = Array(rows).fill().map(() => 
      Array(cols).fill().map(() => {
        const isCriticalThinker = Math.random() * 100 < params.initialCriticalThinkers;
        
        return {
          type: isCriticalThinker ? 'criticalThinker' : 'nonCriticalThinker',
          influence: isCriticalThinker ? 
            Math.random() * params.educationStrength : 
            Math.random() * params.confirmationBias,
          belief: Math.random(),
          age: Math.floor(Math.random() * 80),
        };
      })
    );
    
    setGrid(newGrid);
    setGeneration(0);
    updateStats(newGrid);
  };
  
  // Calculate statistics
  const updateStats = (currentGrid) => {
    let criticalCount = 0;
    let nonCriticalCount = 0;
    
    currentGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.type === 'criticalThinker') {
          criticalCount++;
        } else {
          nonCriticalCount++;
        }
      });
    });
    
    setStats({
      criticalThinkers: (criticalCount / (rows * cols) * 100).toFixed(1),
      nonCriticalThinkers: (nonCriticalCount / (rows * cols) * 100).toFixed(1),
    });
  };
  
  // Main simulation update logic
  const updateGrid = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    
    // Random media event
    if (params.randomEvents && Math.random() < 0.05) {
      const messageIndex = Math.floor(Math.random() * mediaMessages.length);
      setCurrentMediaMessage(mediaMessages[messageIndex]);
      setMessageVisible(true);
      setTimeout(() => setMessageVisible(false), 3000);
      
      // Media influence affects cells based on their critical thinking ability
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = newGrid[i][j];
          
          // Non-critical thinkers are more influenced by media
          if (cell.type === 'nonCriticalThinker' && Math.random() < params.mediaInfluence / 10) {
            cell.influence += 0.5;
          }
          
          // Critical thinkers may analyze media claims
          if (cell.type === 'criticalThinker' && Math.random() < 0.7) {
            cell.influence += 0.2;
          }
        }
      }
    }
    
    // Influence spread between neighbors
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = newGrid[i][j];
        
        // Calculate influence from neighbors
        let criticalInfluence = 0;
        let nonCriticalInfluence = 0;
        let neighborCount = 0;
        
        for (let ni = Math.max(0, i - params.influenceRadius); ni <= Math.min(rows - 1, i + params.influenceRadius); ni++) {
          for (let nj = Math.max(0, j - params.influenceRadius); nj <= Math.min(cols - 1, j + params.influenceRadius); nj++) {
            if (ni === i && nj === j) continue;
            
            const neighbor = grid[ni][nj];
            neighborCount++;
            
            if (neighbor.type === 'criticalThinker') {
              criticalInfluence += neighbor.influence;
            } else {
              nonCriticalInfluence += neighbor.influence;
            }
          }
        }
        
        // Apply social influence
        const totalInfluence = criticalInfluence + nonCriticalInfluence;
        if (totalInfluence > 0) {
          // Chance to change thinking type based on influences
          const criticalRatio = criticalInfluence / totalInfluence;
          
          // Confirmation bias makes people resistant to changing their beliefs
          const confirmationBiasEffect = cell.type === 'nonCriticalThinker' ? params.confirmationBias / 10 : 0;
          
          // Education can promote critical thinking
          const educationEffect = cell.age < 25 ? params.educationStrength / 10 : 0;
          
          // Determine if thinking type should change
          const changeThreshold = cell.type === 'criticalThinker' ? 0.3 : 0.6 + educationEffect - confirmationBiasEffect;
          
          if (criticalRatio > changeThreshold && cell.type === 'nonCriticalThinker') {
            cell.type = 'criticalThinker';
            cell.influence = Math.min(cell.influence + 1, params.educationStrength);
          } else if (criticalRatio < (1 - changeThreshold) && cell.type === 'criticalThinker') {
            cell.type = 'nonCriticalThinker';
            cell.influence = Math.min(cell.influence + 0.5, params.confirmationBias);
          }
        }
        
        // Random life events can impact thinking patterns
        if (params.randomEvents && Math.random() < 0.001) {
          if (Math.random() < 0.5) {
            // Life crisis that prompts reflection
            cell.type = 'criticalThinker';
            cell.influence = Math.min(cell.influence + 2, params.educationStrength);
          } else {
            // Overwhelming information causing fallback to simpler thinking
            cell.type = 'nonCriticalThinker';
            cell.influence = Math.min(cell.influence + 1, params.confirmationBias);
          }
        }
      }
    }
    
    setGrid(newGrid);
    setGeneration(prev => prev + 1);
    updateStats(newGrid);
  };
  
  // Animation loop reference
  const animationRef = useRef(null);
  
  useEffect(() => {
    initializeGrid();
  }, []);
  
  useEffect(() => {
    if (params.running) {
      animationRef.current = setInterval(updateGrid, params.speed);
    } else if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [params.running, params.speed, grid]);
  
  const toggleSimulation = () => {
    setParams({
      ...params,
      running: !params.running
    });
  };
  
  const handleReset = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    setParams({
      ...params,
      running: false
    });
    initializeGrid();
  };
  
  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: parseInt(value, 10)
    });
  };
  
  const toggleRandomEvents = () => {
    setParams({
      ...params,
      randomEvents: !params.randomEvents
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Society Simulation: Spread of Non-Critical Thinking</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <div className="relative bg-white p-2 rounded shadow-md">
            {messageVisible && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded shadow-md z-10 text-sm max-w-xs">
                <strong>Media:</strong> {currentMediaMessage}
              </div>
            )}
            
            <div className="overflow-auto">
              <div 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                  gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                  gap: '1px'
                }}
              >
                {grid.map((row, i) => 
                  row.map((cell, j) => (
                    <div 
                      key={`${i}-${j}`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor: colors[cell.type],
                        borderRadius: '2px'
                      }}
                      title={`${cell.type} (influence: ${cell.influence.toFixed(1)})`}
                    />
                  ))
                )}
              </div>
            </div>
            
            <div className="mt-2 text-center text-sm">
              <div className="flex justify-center gap-4">
                <div>
                  <span className="inline-block w-3 h-3 bg-blue-500 mr-1"></span>
                  Critical Thinkers: {stats.criticalThinkers}%
                </div>
                <div>
                  <span className="inline-block w-3 h-3 bg-red-500 mr-1"></span>
                  Non-Critical Thinkers: {stats.nonCriticalThinkers}%
                </div>
              </div>
              <p className="mt-1">Generation: {generation}</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-3">Simulation Controls</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">
                Initial Critical Thinkers: {params.initialCriticalThinkers}%
                <input
                  type="range"
                  name="initialCriticalThinkers"
                  min="0"
                  max="100"
                  value={params.initialCriticalThinkers}
                  onChange={handleParamChange}
                  className="w-full"
                  disabled={params.running}
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Social Influence Radius: {params.influenceRadius}
                <input
                  type="range"
                  name="influenceRadius"
                  min="1"
                  max="5"
                  value={params.influenceRadius}
                  onChange={handleParamChange}
                  className="w-full"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Media Influence: {params.mediaInfluence}
                <input
                  type="range"
                  name="mediaInfluence"
                  min="0"
                  max="10"
                  value={params.mediaInfluence}
                  onChange={handleParamChange}
                  className="w-full"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Education Strength: {params.educationStrength}
                <input
                  type="range"
                  name="educationStrength"
                  min="1"
                  max="10"
                  value={params.educationStrength}
                  onChange={handleParamChange}
                  className="w-full"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Confirmation Bias: {params.confirmationBias}
                <input
                  type="range"
                  name="confirmationBias"
                  min="1"
                  max="10"
                  value={params.confirmationBias}
                  onChange={handleParamChange}
                  className="w-full"
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Simulation Speed:
                <input
                  type="range"
                  name="speed"
                  min="50"
                  max="500"
                  value={params.speed}
                  onChange={handleParamChange}
                  className="w-full"
                />
                <span className="text-xs">{params.speed}ms (lower = faster)</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="randomEvents"
                checked={params.randomEvents}
                onChange={toggleRandomEvents}
                className="mr-2"
              />
              <label htmlFor="randomEvents" className="text-sm">
                Enable Random Events & Media
              </label>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={toggleSimulation}
                className={`px-3 py-1 rounded font-medium ${params.running ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                {params.running ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded font-medium bg-gray-500 hover:bg-gray-600 text-white"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-sm">
            <h3 className="font-semibold">How to use:</h3>
            <ul className="list-disc ml-5 space-y-1 mt-2">
              <li>Blue cells represent critical thinkers</li>
              <li>Red cells represent non-critical thinkers</li>
              <li>Adjust the parameters and observe how thinking patterns spread</li>
              <li>Media messages will appear randomly when events are enabled</li>
              <li>Higher education strength makes critical thinking more resilient</li>
              <li>Higher confirmation bias makes non-critical thinking persistent</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietySimulation;
