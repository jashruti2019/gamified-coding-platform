import React, { useState } from 'react';

import './CodingAdventureLanding.css';

const CodingAdventureLanding = () => {
  const [emailInput, setEmailInput] = useState('');
  
  return (
    <div className="landing-container">
      
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Begin Your Coding Adventure!</h1>
            <p>Join thousands of young wizards and space explorers learning to code while saving magical realms!</p>
            <button className="cta-button">
              Start Your Coding Quest
            </button>
          </div>
          <div className="hero-image">
            <div className="character-container">
              <div className="character character-wizard">
                <div className="character-eye"></div>
                <div className="character-hat"></div>
              </div>
              <div className="character character-explorer">
                <div className="character-eye"></div>
                <div className="character-helmet"></div>
              </div>
              <div className="code-terminal">
                <div className="code-terminal-inner">
                  <div className="code-terminal-text">
                    <span>&gt; wizard.moveRight()</span>
                    <br />
                    <span>&gt; wizard.castSpell("code")</span>
                    <br />
                    <span>&gt; portal.open()</span>
                    <br />
                    <span className="cursor">_</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="decoration-circle decoration-circle-1"></div>
            <div className="decoration-circle decoration-circle-2"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-container">
          <h2>Coding is an Epic Adventure!</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧙‍♂️</div>
              <h3>Story-Driven Learning</h3>
              <p>Learn coding concepts through exciting quests where YOU are the hero! Help characters solve problems using real code.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Real-Time Coding</h3>
              <p>See your code come to life instantly! Control characters, build worlds, and solve puzzles in real-time.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Progress Tracking</h3>
              <p>Earn badges, level up your wizard or astronaut, and collect coding powers as you master new programming skills!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="section-container">
          <h2>What Young Coders Say</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"I love how I get to be a wizard AND learn coding! I made my character fly using loops!"</p>
              <p className="testimonial-author">- Alex, 8 years old</p>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">"My space explorer just built a whole planet with my code! This is way more fun than my old coding class."</p>
              <p className="testimonial-author">- Sam, 12 years old</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="section-container">
          <h2>Ready to Begin Your Coding Adventure?</h2>
          <p className="cta-description">Join thousands of kids learning to code through exciting quests and challenges. Parents receive regular progress reports!</p>
          
          <div className="cta-form-container">
            <div className="cta-form">
              <input 
                type="email" 
                placeholder="Parent's Email" 
                className="email-input" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button className="cta-button secondary">
                Get Started Free
              </button>
            </div>
            <p className="cta-small-text">Free 7-day trial. No credit card required.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>CodeQuest</h3>
              <p>Making coding magical for kids ages 6-14.</p>
            </div>
            
            <div className="footer-column">
              <h3>For Parents</h3>
              <ul>
                <li><a href="#">Curriculum</a></li>
                <li><a href="#">Safety</a></li>
                <li><a href="#">Progress Reports</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Privacy</h3>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Data Protection</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Contact Us</h3>
              <ul>
                <li><a href="#">support@codequest.com</a></li>
                <li><a href="#">1-800-CODE-FUN</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 CodeQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CodingAdventureLanding;