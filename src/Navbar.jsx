import React, { useState, useEffect } from 'react';
import { Bell, Map, Code, Trophy, Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, link: '/' },
    { name: 'Adventure Map', icon: <Map size={20} />, link: '/gamemap' }, 
    { name: 'Challenges', icon: <Bell size={20} />, link: '/challenge/variables' },
    { name: 'Code Playground', icon: <Code size={20} />, link: '/playground' },
    { name: 'Leaderboard', icon: <Trophy size={20} />, link: '/leaderboard' },

  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <div className="logo-icon">
              <div className="logo-eye"></div>
              <div className="logo-body"></div>
            </div>
            <div className="logo-text">
              <span className="logo-text-highlight">Code</span>
              <span>Quest</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="navbar-item"
              >
                <div className="navbar-item-content">
                  <div className="navbar-item-icon">{item.icon}</div>
                  <span className="navbar-item-text">{item.name}</span>
                </div>
                <div className="navbar-item-indicator"></div>
              </Link>
            ))}
          </div>

          {/* Profile Button */}
          <div className="navbar-profile-container">
            <Link to="/profile" className="navbar-profile-button">
              <div className="profile-avatar">
                <User size={20} className="profile-avatar-icon" />
              </div>
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="navbar-mobile-button-container">
            <button 
              className="navbar-mobile-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="hamburger-icon">
                <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-1-active' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-2-active' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-3-active' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'navbar-mobile-menu-active' : ''}`}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="navbar-mobile-item"
            >
              <span className="navbar-mobile-item-icon">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Mobile Profile */}
          <Link to="/profile" className="navbar-mobile-profile">
            <div className="profile-avatar mobile">
              <User size={20} className="profile-avatar-icon" />
            </div>
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
