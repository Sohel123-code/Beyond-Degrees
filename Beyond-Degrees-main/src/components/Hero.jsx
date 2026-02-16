import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ setActiveSection }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [subheadingIndex, setSubheadingIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const headlines = [
    "Your Life Has More Options Than Just Doctor & Engineer",
    "Marks Decide Exams, Not Your Destiny",
    "Not Everyone Is Meant to Be a Doctor or Engineer — And That's Okay",
    "One Life. Hundreds of Career Paths. Choose Wisely."
  ];

  const subheadings = [
    "Explore real career options beyond society pressure",
    "Discover paths that match your skills, interests, and dreams",
    "Make informed decisions — not forced ones"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
      setSubheadingIndex((prev) => (prev + 1) % subheadings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headlines.length, subheadings.length]);

  useEffect(() => {
    setFadeKey(prev => prev + 1);
  }, [headlineIndex, subheadingIndex]);

  const handleButtonClick = (action) => {
    if (action === 'explore') {
      setActiveSection('career-paths');
      const element = document.getElementById('career-paths');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (action === 'assessment') {
      setActiveSection('skill-assessment');
      const element = document.getElementById('skill-assessment');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <img src="/assests/logo.png" alt="Background Logo" className="bg-logo" />
      </div>
      <div className="hero-content">
        <h1 className="hero-headline" key={`headline-${headlineIndex}-${fadeKey}`}>
          {headlines[headlineIndex]}
        </h1>
        <p className="hero-subheading" key={`subheading-${subheadingIndex}-${fadeKey}`}>
          {subheadings[subheadingIndex]}
        </p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => handleButtonClick('explore')}
          >
            Explore Careers
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => handleButtonClick('assessment')}
          >
            Take Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
