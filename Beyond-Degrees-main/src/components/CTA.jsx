import React from 'react';
import './CTA.css';

const CTA = () => {
  const handleClick = () => {
    const element = document.getElementById('career-paths');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-heading">Ready to Discover Your Path?</h2>
        <p className="cta-text">
          Join thousands of students who have found their calling beyond traditional paths
        </p>
        <button className="btn btn-primary btn-large" onClick={handleClick}>
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default CTA;
