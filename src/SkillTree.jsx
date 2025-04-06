import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Rocket, TreePine, Sparkles, ChevronLeft, Lock, Check, BookOpen } from 'lucide-react';
import './SkillTree.css';

const SkillTree = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  // Create a ref for the skill tree section
  const skillTreeSectionRef = useRef(null);
  
  const userLevel = 7;
  const completedSkills = [
    "variables", "conditionals", "loops", "functions", 
    "arrays", "objects", "debugging"
  ];
  
  const skillTree = {
    beginner: {
      title: "Beginner Path",
      skills: [
        { id: "variables", name: "Variables", level: 1, description: "Learn how to store and manipulate data", icon: "📊", completed: completedSkills.includes("variables"), requiredForIds: ["conditionals", "loops"] },
        { id: "conditionals", name: "Conditionals", level: 2, description: "Master if/else statements and logic", icon: "🧩", completed: completedSkills.includes("conditionals"), requiredForIds: ["loops", "functions"] },
        { id: "loops", name: "Loops", level: 3, description: "Discover how to repeat code with loops", icon: "🔄", completed: completedSkills.includes("loops"), requiredForIds: ["arrays"] },
      ]
    },
    intermediate: {
      title: "Intermediate Path",
      skills: [
        { id: "functions", name: "Functions", level: 4, description: "Create reusable blocks of code", icon: "⚙️", completed: completedSkills.includes("functions"), requiredForIds: ["objects"] },
        { id: "arrays", name: "Arrays", level: 4, description: "Work with collections of data", icon: "📚", completed: completedSkills.includes("arrays"), requiredForIds: ["objects"] },
        { id: "objects", name: "Objects", level: 5, description: "Structure data using objects", icon: "🧠", completed: completedSkills.includes("objects"), requiredForIds: ["classes"] },
        { id: "debugging", name: "Debugging", level: 5, description: "Find and fix code problems", icon: "🐞", completed: completedSkills.includes("debugging"), requiredForIds: ["error-handling"] },
      ]
    },
    advanced: {
      title: "Advanced Path",
      skills: [
        { id: "classes", name: "Classes", level: 6, description: "Understand object-oriented programming", icon: "🏗️", completed: completedSkills.includes("classes"), requiredForIds: ["design-patterns"] },
        { id: "async", name: "Async", level: 7, description: "Master asynchronous programming", icon: "⏱️", completed: completedSkills.includes("async"), requiredForIds: ["api-integration"] },
        { id: "error-handling", name: "Error Handling", level: 7, description: "Handle exceptions and errors gracefully", icon: "🛡️", completed: completedSkills.includes("error-handling"), requiredForIds: ["testing"] },
        { id: "testing", name: "Testing", level: 8, description: "Write tests for your code", icon: "🧪", completed: completedSkills.includes("testing"), requiredForIds: [] },
      ]
    },
    expert: {
      title: "Expert Path",
      skills: [
        { id: "design-patterns", name: "Design Patterns", level: 8, description: "Learn common code patterns", icon: "📐", completed: completedSkills.includes("design-patterns"), requiredForIds: [] },
        { id: "api-integration", name: "API Integration", level: 9, description: "Connect your code to external services", icon: "🔌", completed: completedSkills.includes("api-integration"), requiredForIds: ["security"] },
        { id: "security", name: "Security", level: 10, description: "Secure your applications", icon: "🔒", completed: completedSkills.includes("security"), requiredForIds: [] },
        { id: "performance", name: "Performance", level: 10, description: "Optimize your code for speed", icon: "⚡", completed: completedSkills.includes("performance"), requiredForIds: [] },
      ]
    }
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  // Function to scroll to the skill tree section
  const scrollToSkillTree = () => {
    skillTreeSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const isSkillUnlocked = (skill) => {
    if (skill.level > userLevel) return false;
    
    // Check if required skills are completed
    const allSkills = [
      ...skillTree.beginner.skills,
      ...skillTree.intermediate.skills,
      ...skillTree.advanced.skills,
      ...skillTree.expert.skills
    ];
    
    // Check if this skill has prerequisites
    for (const skillItem of allSkills) {
      if (skillItem.requiredForIds.includes(skill.id)) {
        if (!skillItem.completed) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  const renderSkillDetails = () => {
    if (!selectedSkill) return null;
    
    const isUnlocked = isSkillUnlocked(selectedSkill);
    
    return (
      <div className="skill-details-panel">
        <div className="skill-details-header">
          <span className="skill-icon">{selectedSkill.icon}</span>
          <h3>{selectedSkill.name}</h3>
          {selectedSkill.completed && <Check className="completed-icon" size={20} />}
        </div>
        
        <p className="skill-description">{selectedSkill.description}</p>
        
        {!isUnlocked ? (
          <div className="locked-info">
            <Lock size={16} />
            <span>Requires Level {selectedSkill.level}</span>
          </div>
        ) : selectedSkill.completed ? (
          <button className="review-button">
            <BookOpen size={16} />
            Review Skill
          </button>
        ) : (
          <button className="start-button">
            <Rocket size={16} />
            Start Learning
          </button>
        )}
      </div>
    );
  };
  
  const renderSkillPath = (path, pathData) => {
    return (
      <div key={path} className={`skill-path ${path}-path`}>
        <h3 className="path-title">{pathData.title}</h3>
        <div className="skills-container">
          {pathData.skills.map((skill) => {
            const unlocked = isSkillUnlocked(skill);
            return (
              <div
                key={skill.id}
                className={`skill-node ${skill.completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''} ${selectedSkill?.id === skill.id ? 'selected' : ''}`}
                onClick={() => handleSkillClick(skill)}
              >
                <div className="skill-icon-wrapper">
                  <span className="skill-icon">{skill.icon}</span>
                  {skill.completed && <div className="completion-badge"><Check size={12} /></div>}
                  {!unlocked && <div className="lock-badge"><Lock size={12} /></div>}
                </div>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">Lvl {skill.level}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderConnections = () => {
    // In a real implementation, you would render SVG paths between connected skills
    // This is a simplified placeholder
    return <div className="skill-connections"></div>;
  };

  return (
    <div className="skill-tree-container">
      <div className="skill-tree-card">
        <div className="skill-tree-header">
          <h2>Your Coding Journey</h2>
          <div className="skill-tree-icon">
            <Sparkles className="sparkle-icon" size={24} />
            <Rocket className="rocket-icon" size={32} />
          </div>
        </div>
        
        <div className="skill-tree-content">
          <div className="skill-tree-graphic">
            <TreePine className="tree-icon" size={64} />
            <Star className="star-icon star-1" size={16} />
            <Star className="star-icon star-2" size={12} />
            <Star className="star-icon star-3" size={20} />
          </div>
          
          <p className="skill-tree-description">
            Track your amazing learning journey, unlock coding powers, and discover new abilities as you complete challenges!
          </p>
          
          <button 
            className={`explore-button ${isHovering ? 'button-hover' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={scrollToSkillTree}
          >
            <span className="button-text">Explore Skill Tree</span>
            <Sparkles className="button-sparkle" size={16} />
          </button>
        </div>
      </div>
      
      {/* Add ref to this section */}
      <div className="skill-tree-detailed-section" ref={skillTreeSectionRef}>
        <div className="skill-tree-header">
          <button className="back-button" onClick={() => navigate('/profile')}>
            <ChevronLeft size={20} />
            Back to Profile
          </button>
          <h1>Your Coding Skill Tree</h1>
          <div className="level-indicator">
            <Star size={16} />
            <span>Level {userLevel}</span>
          </div>
        </div>
        
        <div className="skill-tree-content">
          <div className="skill-paths-container">
            {renderConnections()}
            {Object.entries(skillTree).map(([path, pathData]) => 
              renderSkillPath(path, pathData)
            )}
          </div>
          
          {renderSkillDetails()}
        </div>
        
        <div className="skill-tree-legend">
          <div className="legend-item">
            <div className="legend-indicator completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator locked"></div>
            <span>Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;