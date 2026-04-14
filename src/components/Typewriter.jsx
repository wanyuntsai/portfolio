import React, { useState, useEffect } from 'react';

const Typewriter = ({ phrases, speed = 100, deleteSpeed = 50, delay = 2000, className = 'font-mono text-[14px] md:text-[15px] text-[#555]' }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), delay);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases, speed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {phrases[index].substring(0, subIndex)}
      <span className="animate-pulse ml-0.5 font-bold">|</span>
    </span>
  );
};

export default Typewriter;