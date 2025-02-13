import React, { useState, useEffect } from 'react';

export const TypingEffect = ({ text, speed = 100, restartDelay = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const restartTimeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, restartDelay);
      return () => clearTimeout(restartTimeout);
    }
  }, [index, text, speed, restartDelay]);

  return (
    <div className="font-mono text-xl">
      {displayedText}
      <span className="animate-blink">|</span>
    </div>
  );
};