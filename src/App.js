import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function FlashingSpeedReading() {
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isReading && currentIndex < words.length) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 60000 / speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isReading, currentIndex, words, speed]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleStartReading = () => {
    if (text.trim()) {
      setWords(text.trim().split(/\s+/));
      setCurrentIndex(0);
      setIsReading(true);
    }
  };

  const handlePauseReading = () => {
    setIsReading(false);
    clearInterval(timerRef.current);
  };

  const handleResumeReading = () => {
    if (currentIndex < words.length) {
      setIsReading(true);
    }
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleClearText = () => {
    setText('');
    setWords([]);
    setCurrentIndex(0);
    setIsReading(false);
  };

  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
  };

  const highlightCharacters = (word) => {
    if (word.length < 2) return word;
    const indices = Array.from({ length: word.length }, (_, i) => i).sort(() => 0.5 - Math.random()).slice(0, 2);
    return (
      <span>
        {word.split('').map((char, index) => (
          <span
            key={index}
            style={{ color: indices.includes(index) ? 'red' : 'black' }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className={`App ${isFullScreen ? 'full-screen' : ''}`}>
      <h1>Flashing Speed Reader</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your text here..."
        rows="10"
        cols="50"
      />
      <div>
        <button onClick={handleStartReading}>Start</button>
        <button onClick={handlePauseReading}>Pause</button>
        <button onClick={handleResumeReading}>Resume</button>
        <button onClick={handleFullScreenToggle}>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</button>
        <button onClick={handleClearText}>Clear</button>
        <button onClick={handlePasteText}>Paste</button>
        <label>
          Speed (WPM):
          <input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
            min="100"
            max="1000"
          />
        </label>
      </div>
      <div className="word-display">
        {currentIndex < words.length && (
          <div className="current-word">
            {highlightCharacters(words[currentIndex])}
          </div>
        )}
      </div>
    </div>
  );
}

function HighlightingSpeedReading() {
  const [text, setText] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [speed, setSpeed] = useState(300);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isReading && text.length > 0) {
      timerRef.current = setInterval(() => {
        setHighlightIndex((prevIndex) => (prevIndex + 1) % text.length);
      }, 60000 / speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isReading, text, speed]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleStartReading = () => {
    if (text.trim()) {
      setHighlightIndex(0);
      setIsReading(true);
    }
  };

  const handlePauseReading = () => {
    setIsReading(false);
    clearInterval(timerRef.current);
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  const renderHighlightedText = () => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        style={{ backgroundColor: index === highlightIndex ? 'yellow' : 'transparent' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="App">
      <h1>Highlighting Speed Reader</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your text here..."
        rows="10"
        cols="50"
      />
      <div>
        <button onClick={handleStartReading}>Start</button>
        <button onClick={handlePauseReading}>Pause</button>
        <label>
          Speed (WPM):
          <input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
            min="100"
            max="1000"
          />
        </label>
      </div>
      <div className="highlighted-text">
        {renderHighlightedText()}
      </div>
    </div>
  );
}

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
        <Switch>
          <Route path="/" exact component={FlashingSpeedReading} />
          <Route path="/highlight" component={HighlightingSpeedReading} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
