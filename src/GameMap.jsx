import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import './GameMap.css';

const GameMap = ({ userProgress = {} }) => {
  const mapRef = useRef(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Define the regions and their properties
  const regions = [
    {
      id: 'variables',
      name: 'Variable Valley',
      description: 'Learn about creating and using variables',
      position: { top: '20%', left: '15%' },
      difficulty: 1,
      completed: userProgress.variables || false,
      unlocked: true, // Starting area is always unlocked
      isBoss: false,
      icon: '🏕️'
    },
    {
      id: 'loops',
      name: 'Loop Lagoon',
      description: 'Master the art of loops and iterations',
      position: { top: '35%', left: '30%' },
      difficulty: 2,
      completed: userProgress.loops || false,
      unlocked: userProgress.variables || false,
      isBoss: false,
      icon: '🌊'
    },
    {
      id: 'conditionals',
      name: 'Conditional Canyon',
      description: 'Learn about if/else statements and logic',
      position: { top: '50%', left: '20%' },
      difficulty: 2,
      completed: userProgress.conditionals || false,
      unlocked: userProgress.variables || false,
      isBoss: false,
      icon: '🏜️'
    },
    {
      id: 'functions',
      name: 'Function Forest',
      description: 'Create reusable blocks of code',
      position: { top: '40%', left: '50%' },
      difficulty: 3,
      completed: userProgress.functions || false,
      unlocked: (userProgress.loops || false) && (userProgress.conditionals || false),
      isBoss: false,
      icon: '🌲'
    },
    {
      id: 'arrays',
      name: 'Array Archipelago',
      description: 'Work with collections of data',
      position: { top: '65%', left: '45%' },
      difficulty: 3,
      completed: userProgress.arrays || false,
      unlocked: userProgress.functions || false,
      isBoss: false,
      icon: '🏝️'
    },
    {
      id: 'objects',
      name: 'Object Oasis',
      description: 'Learn about complex data structures',
      position: { top: '70%', left: '70%' },
      difficulty: 4,
      completed: userProgress.objects || false,
      unlocked: userProgress.arrays || false,
      isBoss: false,
      icon: '🏺'
    },
    {
      id: 'bossBattle',
      name: 'Algorithm Castle',
      description: 'Test all your skills in the final challenge!',
      position: { top: '25%', left: '75%' },
      difficulty: 5,
      completed: userProgress.bossBattle || false,
      unlocked: userProgress.functions && userProgress.arrays && userProgress.objects || false,
      isBoss: true,
      icon: '🏰'
    }
  ];

  // State for the selected region
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  // Path connections between regions
  const paths = [
    { from: 'variables', to: 'loops', completed: userProgress.variables || false },
    { from: 'variables', to: 'conditionals', completed: userProgress.variables || false },
    { from: 'loops', to: 'functions', completed: userProgress.loops || false },
    { from: 'conditionals', to: 'functions', completed: userProgress.conditionals || false },
    { from: 'functions', to: 'arrays', completed: userProgress.functions || false },
    { from: 'arrays', to: 'objects', completed: userProgress.arrays || false },
    { from: 'functions', to: 'bossBattle', completed: userProgress.functions || false },
    { from: 'arrays', to: 'bossBattle', completed: userProgress.arrays || false },
    { from: 'objects', to: 'bossBattle', completed: userProgress.objects || false }
  ];

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setMapDimensions({ width, height });
        setIsMobile(window.innerWidth < 768);
      }
    };

    // Initial setup
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle region click
  const handleRegionClick = (region) => {
    if (region.unlocked) {
      setSelectedRegion(region);
      // Here you would typically trigger navigation to the challenge
      console.log(`Starting challenge: ${region.name}`);
    } else {
      console.log(`Region ${region.name} is locked!`);
    }
  };

  // Close the details panel
  const closeDetails = () => {
    setSelectedRegion(null);
  };

  // Get scaled size based on viewport
  const getRegionSize = (isLarge = false) => {
    const baseSize = mapDimensions.width * 0.08; // 8% of map width
    return isLarge ? baseSize * 1.2 : baseSize;
  };

  // Calculate actual position based on percentage and viewport
  const calculatePosition = (position) => {
    const top = parseInt(position.top, 10) / 100 * mapDimensions.height;
    const left = parseInt(position.left, 10) / 100 * mapDimensions.width;
    return { top, left };
  };

  // Render paths between regions
  const renderPaths = () => {
    return paths.map((path, index) => {
      const fromRegion = regions.find(r => r.id === path.from);
      const toRegion = regions.find(r => r.id === path.to);
      
      if (!fromRegion || !toRegion) return null;
      
      // Calculate path positions
      const fromPos = getRegionCenter(fromRegion);
      const toPos = getRegionCenter(toRegion);
      
      const pathClass = `map-path ${path.completed ? 'completed' : ''} ${fromRegion.unlocked ? 'visible' : 'hidden'}`;
      
      return (
        <svg key={`path-${index}`} className="path-container">
          <line 
            x1={fromPos.x} 
            y1={fromPos.y} 
            x2={toPos.x} 
            y2={toPos.y} 
            className={pathClass}
          />
        </svg>
      );
    });
  };

  // Helper function to get region center coordinates
  const getRegionCenter = (region) => {
    const size = getRegionSize(region.isBoss);
    const position = calculatePosition(region.position);
    return {
      x: position.left + size / 2,
      y: position.top + size / 2
    };
  };

  // Render treasure chests for completed regions
  const renderTreasures = () => {
    return regions
      .filter(region => region.completed)
      .map(region => {
        const position = calculatePosition(region.position);
        const size = getRegionSize(region.isBoss);
        
        return (
          <div 
            key={`treasure-${region.id}`}
            className="treasure-chest"
            style={{ 
              top: `${position.top + size * 0.7}px`, 
              left: `${position.left + size * 0.2}px`,
              fontSize: `${mapDimensions.width * 0.02}px`
            }}
          >
            💎
          </div>
        );
      });
  };

  return (
    <div className="game-map-container">
      
      <div className="game-map" ref={mapRef}>
        <div className="map-background">
          {/* Cloud animations */}
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          
          {/* Water animations */}
          <div className="water"></div>
          
          {/* Render paths between regions */}
          {mapDimensions.width > 0 && renderPaths()}
          
          {/* Render all regions */}
          {mapDimensions.width > 0 && regions.map(region => {
            const position = calculatePosition(region.position);
            const size = getRegionSize(region.isBoss);
            
            return (
              <div
                key={region.id}
                className={`map-region ${region.completed ? 'completed' : ''} ${region.unlocked ? 'unlocked' : 'locked'} ${region.isBoss ? 'boss' : ''}`}
                style={{ 
                  top: `${position.top}px`, 
                  left: `${position.left}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  fontSize: `${mapDimensions.width * 0.01}px`
                }}
                onClick={() => handleRegionClick(region)}
              >
                <div className="region-icon" style={{ fontSize: `${mapDimensions.width * 0.02}px` }}>
                  {region.icon}
                </div>
                <div className="region-difficulty">
                  {'⭐'.repeat(region.difficulty)}
                </div>
                <div className="region-name">{isMobile ? region.name.split(' ')[0] : region.name}</div>
                
                {!region.unlocked && <div className="lock-icon">🔒</div>}
                
                {/* Glow effect for unlocked but not completed regions */}
                {region.unlocked && !region.completed && 
                  <div className="region-glow"></div>
                }
              </div>
            );
          })}
          
          {/* Render treasure chests */}
          {mapDimensions.width > 0 && renderTreasures()}
          
          {/* Render a compass */}
          <div className="compass" style={{ fontSize: `${mapDimensions.width * 0.03}px` }}>
            <div className="compass-rose">🧭</div>
          </div>
          
          {/* Map title */}
          <div className="map-title" style={{ fontSize: `${Math.min(32, mapDimensions.width * 0.04)}px` }}>
            Coding Adventure World
          </div>
        </div>
      </div>
      
      {/* Region details panel */}
      {selectedRegion && (
        <div className={`region-details ${isMobile ? 'mobile' : ''}`}>
          <div className="details-header">
            <h2>{selectedRegion.name}</h2>
            <button className="close-button" onClick={closeDetails}>×</button>
          </div>
          <p className="details-description">{selectedRegion.description}</p>
          <div className="details-difficulty">
            Difficulty: {'⭐'.repeat(selectedRegion.difficulty)}
          </div>
          <button 
            className="start-challenge-button"
          >
            {selectedRegion.completed ? 'Replay Challenge' : 'Start Challenge'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameMap;