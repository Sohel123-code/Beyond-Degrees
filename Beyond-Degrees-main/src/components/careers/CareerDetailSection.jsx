import React from 'react';
import './CareerDetailSection.css';

const CareerDetailSection = ({ title, children }) => {
  return (
    <section className="detailSection">
      <h2 className="detailSection__title">{title}</h2>
      <div className="detailSection__body">{children}</div>
    </section>
  );
};

export default CareerDetailSection;

