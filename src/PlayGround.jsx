import React, { useState, useEffect } from 'react';
import './PlayGround.css';
import { Play, Lightbulb, Save, Trash } from 'lucide-react';

const PlayGround = () => {
  const [code, setCode] = useState('// Write your code here!\nconsole.log("Hello, coder!");');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [mascotMessage, setMascotMessage] = useState('');
  const [theme, setTheme] = useState('space');

  const mascotTips = [
    "Try using 'console.log()' to show text!",
    "Don't forget your semicolons!",
    "Remember to use double quotes for strings!",
    "Variables help you store information!",
    "Functions are like little robots that do tasks for you!"
  ];

  const themes = {
    space: {
      name: 'Space Adventure',
      borderColor: '#8A2BE2',
      backgroundColor: '#0A0E2A',
      textColor: '#8A2BE2'
    },
    ocean: {
      name: 'Ocean Explorer',
      borderColor: '#1E90FF',
      backgroundColor: '#E0F7FA',
      textColor: '#01579B'
    },
    jungle: {
      name: 'Jungle Safari',
      borderColor: '#32CD32',
      backgroundColor: '#F1F8E9',
      textColor: '#33691E'
    }
  };

  const runCode = () => {
    try {
      // Clear previous output
      setOutput('');
      
      // Create a mock console.log function
      const originalConsoleLog = console.log;
      const capturedOutput = [];
      
      console.log = (...args) => {
        capturedOutput.push(args.join(' '));
        originalConsoleLog(...args);
      };
      
      // Execute the code
      // eslint-disable-next-line no-new-func
      const result = new Function(code)();
      
      // Restore original console.log
      console.log = originalConsoleLog;
      
      // Set the output
      setOutput(capturedOutput.join('\n'));
      
      // Play success sound
      playSound('success');
      
      // Show success animation
      const outputArea = document.querySelector('.output-area');
      outputArea.classList.add('success-animation');
      setTimeout(() => {
        outputArea.classList.remove('success-animation');
      }, 1000);
      
    } catch (error) {
      setOutput(`Oops! Error: ${error.message}`);
      playSound('error');
    }
  };

  const showRandomTip = () => {
    const randomTip = mascotTips[Math.floor(Math.random() * mascotTips.length)];
    setMascotMessage(randomTip);
    setShowMascot(true);
    
    // Hide mascot after 5 seconds
    setTimeout(() => {
      setShowMascot(false);
    }, 5000);
    
    playSound('hint');
  };

  const playSound = (soundType) => {
    const audio = new Audio();
    
    switch (soundType) {
      case 'success':
        audio.src = '/sounds/success.mp3';
        break;
      case 'error':
        audio.src = '/sounds/error.mp3';
        break;
      case 'hint':
        audio.src = '/sounds/hint.mp3';
        break;
      default:
        return;
    }
    
    audio.play().catch(e => console.error("Sound couldn't play:", e));
  };

  const changeTheme = (themeName) => {
    setTheme(themeName);
    playSound('success');
  };

  const clearCode = () => {
    setCode('// Write your code here!');
    setOutput('');
    playSound('hint');
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_awesome_code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    playSound('success');
  };

  // Apply current theme to document root for CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];
    
    root.style.setProperty('--border-color', currentTheme.borderColor);
    root.style.setProperty('--bg-color', currentTheme.backgroundColor);
    root.style.setProperty('--text-color', currentTheme.textColor);
  }, [theme]);

  return (
    <div className={`playground-container ${theme}-theme`}>
      <div className="header">
        <h1>Code Adventure!</h1>
        <div className="theme-selector">
          <button 
            className={`theme-button space ${theme === 'space' ? 'active' : ''}`} 
            onClick={() => changeTheme('space')}>
            Space
          </button>
          <button 
            className={`theme-button ocean ${theme === 'ocean' ? 'active' : ''}`} 
            onClick={() => changeTheme('ocean')}>
            Ocean
          </button>
          <button 
            className={`theme-button jungle ${theme === 'jungle' ? 'active' : ''}`} 
            onClick={() => changeTheme('jungle')}>
            Jungle
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="code-panel">
          <div className="panel-header">
            <h2>Your Code</h2>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>
        
        <div className="output-panel">
          <div className="panel-header">
            <h2>Output</h2>
          </div>
          <div className="output-area">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
      
      <div className="control-panel">
        <button className="control-button run-button" onClick={runCode}>
          <Play size={24} />
          Run Code
        </button>
        <button className="control-button hint-button" onClick={showRandomTip}>
          <Lightbulb size={24} />
          Hint
        </button>
        <button className="control-button save-button" onClick={saveCode}>
          <Save size={24} />
          Save
        </button>
        <button className="control-button clear-button" onClick={clearCode}>
          <Trash size={24} />
          Clear
        </button>
      </div>
      
      {showMascot && (
        <div className="mascot-container">
          <div className="mascot">
            <div className="mascot-bubble">
              {mascotMessage}
            </div>
            <div className="mascot-character">
              {theme === 'space' && '🚀'}
              {theme === 'ocean' && '🐠'}
              {theme === 'jungle' && '🦁'}
            </div>
          </div>
        </div>
      )}
      
      {showHint && (
        <div className="hint-modal">
          <div className="hint-content">
            <h3>Need help?</h3>
            <p>Try writing a simple program like:</p>
            <pre>
              console.log("My name is ___");
              console.log(5 + 5);
            </pre>
            <button onClick={() => setShowHint(false)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayGround;