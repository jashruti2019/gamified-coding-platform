import React, { useState } from 'react';
import { Star, RefreshCw, CheckCircle, HelpCircle, Rocket, Award } from 'lucide-react';
import './CodeChallenge.css';


const CodeChallenge = () => {
  const [code, setCode] = useState(`// Help AstroBot fix the ship using loops!
// Try using a 'for' loop to check all engine parts

for (let i = 0; i < 5; i++) {
  checkEnginePart(i);
}

// Your code here...
`);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stars, setStars] = useState(0);
  const [coins, setCoins] = useState(0);

  const hints = [
    "Remember to use a 'for' loop to check each engine part!",
    "The spaceship has 5 engine parts that need checking.",
    "You can use 'repairPart(i)' to fix a broken part."
  ];

  const handleSubmit = () => {
    // Simple validation to check if code contains needed elements
    if (code.includes('for') && code.includes('checkEnginePart') && code.includes('repairPart')) {
      setFeedback({
        success: true,
        message: "Great job! AstroBot fixed the spaceship engines!"
      });
      setShowConfetti(true);
      setStars(stars + 2);
      setCoins(coins + 50);
      
      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } else {
      setFeedback({
        success: false,
        message: "Not quite! The spaceship still needs repairs. Try again!"
      });
    }
  };

  const handleTryAgain = () => {
    setCode(`// Help AstroBot fix the ship using loops!
// Try using a 'for' loop to check all engine parts

for (let i = 0; i < 5; i++) {
  checkEnginePart(i);
}

// Your code here...
`);
    setFeedback(null);
  };

  return (

    
    <div className="code-challenge-container">
         
         
      {/* Story Header */}
      <div className="challenge-header">
        <div className="challenge-title">
          <Rocket className="header-icon" />
          <h1>AstroBot's Spaceship Rescue</h1>
        </div>
        <div className="player-stats">
          <div className="stat">
            <Star className="stat-icon" />
            <span>{stars}</span>
          </div>
          <div className="stat">
            <Award className="stat-icon" />
            <span>{coins}</span>
          </div>
        </div>
      </div>

      {/* Mission Briefing */}
      <div className="mission-briefing">
        <div className="story-container">
          <p>
            <strong>MISSION ALERT:</strong> AstroBot's spaceship is stranded in the asteroid belt! 
            The engines are malfunctioning and need urgent repairs. Help AstroBot check and fix all 
            5 engine parts using loops before the asteroids get too close!
          </p>
        </div>
        <div className="astrobot-image"></div>
      </div>

      {/* Main Challenge Area */}
      <div className="challenge-content">
        {/* Code Editor */}
        <div className="code-editor-container">
          <div className="code-editor-header">
            <h3>Repair Code</h3>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
          <div className="code-actions">
            <button className="submit-btn" onClick={handleSubmit}>
              <CheckCircle size={18} />
              Submit Code
            </button>
            <button className="reset-btn" onClick={handleTryAgain}>
              <RefreshCw size={18} />
              Try Again
            </button>
            {feedback?.success && (
    <button className="next-btn" onClick={() => alert("Next challenge coming soon!")}>
      🚀 Next Challenge
    </button>
  )}
          </div>
          {feedback && (
            <div className={`feedback ${feedback.success ? 'success' : 'error'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      

        {/* Hints Panel */}
        <div className="hints-container">
          <div className="hints-header" onClick={() => setShowHints(!showHints)}>
            <HelpCircle size={18} />
            <h3>Mission Hints</h3>
          </div>
          {showHints && (
            <ul className="hints-list">
              {hints.map((hint, index) => (
                <li key={index} className="hint-item">
                  {hint}
                </li>
              ))}
            </ul>
          )}
          <div className="instructions-panel">
            <h4>Available Commands:</h4>
            <ul>
              <li><code>checkEnginePart(number)</code> - Check if part is broken</li>
              <li><code>repairPart(number)</code> - Fix the broken part</li>
              <li><code>testEngine()</code> - Test if engine works now</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confetti overlay */}
      {showConfetti && <div className="confetti-overlay"></div>}
    </div>
  

  );
};

export default CodeChallenge;