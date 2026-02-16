import React, { useEffect, useRef } from 'react';
import './ContentSection.css';

const ContentSection = ({ id, heading, description, image, reverse, buttonText }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleButtonClick = () => {
    // Scroll to next section or perform action
    const sections = document.querySelectorAll('.content-section');
    const currentIndex = Array.from(sections).indexOf(sectionRef.current);
    if (currentIndex < sections.length - 1) {
      sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`content-section ${reverse ? 'reverse' : ''}`} 
      id={id}
    >
      <div className="content-wrapper">
        <div className="content-text">
          <h2 className="section-heading">{heading}</h2>
          <p className="section-description">{description}</p>
          <button className="btn btn-outline" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
        <div className="content-image">
          <img src={image} alt={heading} className="section-img" />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
