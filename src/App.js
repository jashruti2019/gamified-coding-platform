import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CodingAdventureLanding from './CodingAdventureLanding';
import ProfileDashboard from './ProfileDashboard';
import GameMap from './GameMap';
import CodeChallenge from './CodeChallenge'; // already imported
import PlayGround from './PlayGround';
import LeaderBoard from './LeaderBoard';
import SkillTree from './SkillTree';

const App = () => {
  return (
   
    <Router>
       <Navbar /> 
      <Routes>
        <Route path="/skill-tree" element={<SkillTree />} />
        <Route path="/" element={<CodingAdventureLanding />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/gamemap" element={<GameMap />} />
        <Route path="/challenge/:regionId" element={<CodeChallenge />} /> 
        <Route path="/playground" element={<PlayGround />} />        
        <Route path="/leaderboard" element={<LeaderBoard />} />      

      </Routes>
    </Router>
  );
};

export default App;
