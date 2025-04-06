import React, { useState } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { Award, ChevronRight, Book, Code, Gamepad2, Trophy, PenTool, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProfileDashboard.css';

const ProfileDashboard = () => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarColor, setAvatarColor] = useState('#8b5cf6'); // Default purple
  const [avatarType, setAvatarType] = useState('initial'); // 'initial', 'emoji'
  const [avatarValue, setAvatarValue] = useState('C'); // Initial letter or emoji
  const navigate = useNavigate();
  const userData = {
    username: "CodeWizard42",
    level: 7,
    xp: 320,
    xpToNextLevel: 500,
    recentAchievements: [
      { id: 1, name: "Loop Master", icon: "🔄", date: "2 days ago" },
      { id: 2, name: "Bug Squasher", icon: "🐞", date: "1 week ago" },
      { id: 3, name: "Function Fanatic", icon: "⚙️", date: "2 weeks ago" }
    ],
    unlockedItems: [
      { id: 1, name: "Robot Helper", type: "character" },
      { id: 2, name: "Space Station", type: "world" },
      { id: 3, name: "Pixel Painter", type: "tool" }
    ],
    progressData: [
      { name: 'Sun', progress: 3 },
      { name: 'Mon', progress: 4 },
      { name: 'Tue', progress: 2 },
      { name: 'Wed', progress: 5 },
      { name: 'Thu', progress: 6 },
      { name: 'Fri', progress: 4 },
      { name: 'Sat', progress: 8 }
    ]
  };

  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;

  const avatarEmojis = ["👩‍💻", "👨‍💻", "🧙", "🦸‍♀️", "🦸‍♂️", "🚀", "🤖", "👾", "🎮"];
  const colorOptions = [
    "#8b5cf6", // Purple
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f97316", // Orange
    "#ef4444", // Red
    "#ec4899", // Pink
    "#6366f1", // Indigo
    "#f59e0b", // Amber
  ];

  const handleAvatarClick = () => {
    setShowAvatarModal(true);
  };

  const handleCloseModal = () => {
    setShowAvatarModal(false);
  };

  const selectAvatarType = (type, value) => {
    setAvatarType(type);
    setAvatarValue(value);
  };

  const selectColor = (color) => {
    setAvatarColor(color);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Header Area */}
        <div className="profile-header">
          <div className="user-info-section">
            <div className="avatar" onClick={handleAvatarClick} style={{ backgroundColor: avatarColor }}>
              {avatarType === 'initial' ? avatarValue : avatarType === 'emoji' ? avatarValue : userData.username.charAt(0)}
              <div className="avatar-change-indicator">
                <PenTool size={14} />
              </div>
            </div>
            <div className="user-details">
              <h1 className="username">{userData.username}</h1>
              <div className="level-badge">
                <Trophy size={16} />
                <span>Level {userData.level}</span>
              </div>
            </div>
          </div>
          <button className="continue-button">
            Continue Adventure
            <ChevronRight size={20} />
          </button>

        </div>
        <div className="coding-journey-section">
  <h2 className="coding-journey-title">Your Coding Journey</h2>
  <p className="coding-journey-description">Track your learning progress and unlock new powers!</p>

  <button
    onClick={() => navigate('/skill-tree')}
    className="skill-tree-button"
  >
    <span className="skill-tree-button-icon">🌟</span> View Your Skill Tree
  </button>
</div>

        {/* Main Content */}
        <div className="main-content">
          {/* XP and Progress Section */}
          <div className="progress-section">
            <div className="card xp-card">
              <div className="xp-header">
                <span className="xp-title">XP Progress</span>
                <span className="xp-count">{userData.xp}/{userData.xpToNextLevel} XP</span>
              </div>
              <div className="xp-bar-background">
                <div className="xp-bar-progress" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>

            <div className="card chart-card">
              <h2 className="card-title">
                <Code size={18} />
                Your Coding Week
              </h2>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userData.progressData}>
                    <XAxis dataKey="name" stroke="#6366F1" />
                    <Bar dataKey="progress" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-caption">
                Challenges completed each day
              </div>
            </div>
          </div>

          {/* Achievements and Unlocks */}
          <div className="achievements-section">
            <div className="achievements-row">
              <div className="card achievements-card">
                <h2 className="card-title">
                  <Award size={18} />
                  Recent Achievements
                </h2>
                <ul className="achievements-list">
                  {userData.recentAchievements.map(achievement => (
                    <li key={achievement.id} className="achievement-item">
                      <span className="achievement-icon">{achievement.icon}</span>
                      <div className="achievement-details">
                        <div className="achievement-name">{achievement.name}</div>
                        <div className="achievement-date">{achievement.date}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card unlocked-card">
                <h2 className="card-title">
                  <Gamepad2 size={18} />
                  Unlocked Adventures
                </h2>
                <ul className="unlocked-list">
                  {userData.unlockedItems.map(item => (
                    <li key={item.id} className="unlocked-item">
                      <span className="item-icon">
                        {item.type === 'character' ? '🤖' : item.type === 'world' ? '🌍' : '🔧'}
                      </span>
                      <span className="item-name">{item.name}</span>
                    </li>
                  ))}
                </ul>
                <button className="view-all-button">
                  <Book size={16} />
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Selection Modal */}
        {showAvatarModal && (
          <div className="avatar-selection-modal">
            <div className="avatar-modal-content">
              <div className="avatar-modal-header">
                <h2>Choose Your Avatar</h2>
                <button className="avatar-close-button" onClick={handleCloseModal}>
                  <X size={24} />
                </button>
              </div>
              
              <h3>Initial</h3>
              <div className="avatar-options">
                {["C", "W", userData.username.charAt(0)].map((initial) => (
                  <div 
                    key={initial}
                    className="avatar-option" 
                    style={{ backgroundColor: avatarColor }}
                    onClick={() => selectAvatarType('initial', initial)}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              
              <h3>Emoji</h3>
              <div className="avatar-options">
                {avatarEmojis.map((emoji) => (
                  <div 
                    key={emoji}
                    className="avatar-option" 
                    style={{ backgroundColor: avatarColor }}
                    onClick={() => selectAvatarType('emoji', emoji)}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              
              <div className="avatar-colors">
                <h3>Avatar Color</h3>
                <div className="color-options">
                  {colorOptions.map((color) => (
                    <div 
                      key={color}
                      className={`color-option ${color === avatarColor ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => selectColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        )}
      </div>
      
    </div>
  );
};

export default ProfileDashboard;