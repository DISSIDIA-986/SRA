import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function HighlightingSpeedReading() {
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [repeat, setRepeat] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isReading && highlightIndex < words.length) {
      timerRef.current = setInterval(() => {
        setHighlightIndex((prevIndex) => (prevIndex + 1));
      }, 60000 / speed);
    } else if (isReading && highlightIndex >= words.length && repeat) {
      setHighlightIndex(0);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isReading, highlightIndex, words, speed, repeat]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleStartReading = () => {
    if (text.trim()) {
      setWords(text.trim().split(/\s+/));
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

  const handleRepeatToggle = () => {
    setRepeat((prev) => !prev);
  };

  const renderHighlightedText = () => {
    return words.map((word, index) => (
      <span
        key={index}
        style={{ 
          backgroundColor: index === highlightIndex ? 'red' : 'transparent', 
          marginRight: '5px',
          display: 'inline-block'
        }}
      >
        {word}
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
        style={{ width: '90%', maxWidth: '600px' }}
      />
      <div>
        <button onClick={handleStartReading}>Start</button>
        <button onClick={handlePauseReading}>Pause</button>
        <button onClick={handleRepeatToggle}>{repeat ? 'Repeat: On' : 'Repeat: Off'}</button>
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
      <div className="highlighted-text" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', width: '90%', maxWidth: '600px', margin: '0 auto', textAlign: 'justify' }}>
        {renderHighlightedText()}
      </div>
    </div>
  );
}

export default HighlightingSpeedReading;
