import React, { useState } from 'react';
import './LeaderBoard.css';
import { Trophy, Award, Star, Medal, Zap, Code, BookOpen } from 'lucide-react';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Sample data for top coders
  const topCoders = [
    { id: 1, username: "CodeNinja", avatar: "😎", xp: 9840, rank: 1, streak: 45, level: 32 },
    { id: 2, username: "ByteWizard", avatar: "🧙", xp: 8750, rank: 2, streak: 37, level: 29 },
    { id: 3, username: "PixelProgrammer", avatar: "👾", xp: 8320, rank: 3, streak: 30, level: 28 },
    { id: 4, username: "LogicLion", avatar: "🦁", xp: 7950, rank: 4, streak: 28, level: 26 },
    { id: 5, username: "RoboCoder", avatar: "🤖", xp: 7630, rank: 5, streak: 25, level: 25 },
    { id: 6, username: "DataDragon", avatar: "🐉", xp: 7420, rank: 6, streak: 22, level: 24 },
    { id: 7, username: "AlgoAstronaut", avatar: "👨‍🚀", xp: 7210, rank: 7, streak: 20, level: 24 },
    { id: 8, username: "TechTiger", avatar: "🐯", xp: 6890, rank: 8, streak: 18, level: 23 },
    { id: 9, username: "CyberChampion", avatar: "🏆", xp: 6750, rank: 9, streak: 15, level: 22 },
    { id: 10, username: "BugBuster", avatar: "🐞", xp: 6540, rank: 10, streak: 12, level: 21 },
  ];

  // Sample data for achievements
  const achievements = [
    { 
      id: 1, 
      title: "Loop Master", 
      description: "Complete 50 loop challenges", 
      icon: <Zap size={24} />, 
      progress: 42, 
      total: 50, 
      completed: false,
      color: "#FF6B6B" 
    },
    { 
      id: 2, 
      title: "Function Wizard", 
      description: "Create 25 working functions", 
      icon: <Code size={24} />, 
      progress: 25, 
      total: 25, 
      completed: true,
      color: "#4ECDC4" 
    },
    { 
      id: 3, 
      title: "Bug Hunter", 
      description: "Fix 30 bugs in your code", 
      icon: <Award size={24} />, 
      progress: 18, 
      total: 30, 
      completed: false,
      color: "#FFD166" 
    },
    { 
      id: 4, 
      title: "Coding Streak", 
      description: "Code for 7 days in a row", 
      icon: <Star size={24} />, 
      progress: 7, 
      total: 7, 
      completed: true,
      color: "#FF9F1C" 
    },
    { 
      id: 5, 
      title: "Algorithm Ace", 
      description: "Solve 15 algorithm challenges", 
      icon: <Medal size={24} />, 
      progress: 8, 
      total: 15, 
      completed: false,
      color: "#6A4C93" 
    },
    { 
      id: 6, 
      title: "Learning Explorer", 
      description: "Complete all tutorials", 
      icon: <BookOpen size={24} />, 
      progress: 12, 
      total: 20, 
      completed: false,
      color: "#1982C4" 
    },
  ];

  // Calculate ranking badge based on rank
  const getRankBadge = (rank) => {
    if (rank === 1) return <Trophy size={20} className="gold-badge" />;
    if (rank === 2) return <Trophy size={20} className="silver-badge" />;
    if (rank === 3) return <Trophy size={20} className="bronze-badge" />;
    return <span className="rank-number">{rank}</span>;
  };

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="stars-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="star" style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}>✨</div>
          ))}
        </div>
        <h1 className="main-title">Coding Champions</h1>
      </div>

      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={16} />
          Leaderboard
        </button>
        <button 
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <Award size={16} />
          Achievements
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="section leaderboard-section">
          <div className="section-header">
            <h2 className="section-title">Top Coders <span className="sparkle">✨</span></h2>
            <div className="robot-mascot">🤖</div>
          </div>
          
          <div className="leaderboard-list">
            {topCoders.map((coder, index) => (
              <div 
                key={coder.id} 
                className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="rank">
                  {getRankBadge(coder.rank)}
                </div>
                <div className="avatar-container">
                  <div className="avatar-background" style={{backgroundColor: index < 3 ? '#FFD700' : '#E0E0E0'}}>
                    <div className="avatar">
                      {coder.avatar}
                    </div>
                  </div>
                  {index < 3 && <div className="crown">👑</div>}
                </div>
                <div className="user-info">
                  <h3 className="username">{coder.username}</h3>
                  <div className="stats-row">
                    <div className="streak">
                      <span className="streak-flame">🔥</span> {coder.streak} day streak
                    </div>
                    <div className="level">
                      Level {coder.level}
                    </div>
                  </div>
                </div>
                <div className="xp-container">
                  <span className="xp-value">{coder.xp.toLocaleString()}</span>
                  <span className="xp-label">XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="section achievements-section">
          <div className="section-header">
            <h2 className="section-title">Your Achievements <span className="sparkle">✨</span></h2>
            <div className="robot-mascot">🚀</div>
          </div>
          
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${achievement.completed ? 'completed' : ''}`}
                style={{animationDelay: `${achievement.id * 0.1}s`}}
              >
                {achievement.completed && 
                  <div className="confetti-container">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="confetti" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFD166', '#1982C4'][Math.floor(Math.random() * 5)]
                      }}></div>
                    ))}
                  </div>
                }
                <div 
                  className="achievement-icon"
                  style={{backgroundColor: achievement.color, color: '#fff'}}
                >
                  {achievement.icon}
                  {achievement.completed && <div className="completion-badge">✓</div>}
                </div>
                <div className="achievement-details">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${(achievement.progress / achievement.total) * 100}%`,
                        backgroundColor: achievement.color
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    <span>{achievement.progress}/{achievement.total}</span>
                    {achievement.completed && <span className="completed-text">COMPLETED!</span>}
                  </div>
                </div>
                {achievement.completed && <div className="badge-shine"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="footer">
        <div className="code-elements">
          <span className="code-element">&lt;/&gt;</span>
          <span className="code-element">{ }</span>
          <span className="code-element">[]</span>
          <span className="code-element">()</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;