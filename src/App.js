import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlashingSpeedReading from './FlashingSpeedReading';
import HighlightingSpeedReading from './HighlightingSpeedReading';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Flashing Speed Reading</Link></li>
            <li><Link to="/highlight">Highlighting Speed Reading</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<FlashingSpeedReading />} />
          <Route path="/highlight" element={<HighlightingSpeedReading />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
