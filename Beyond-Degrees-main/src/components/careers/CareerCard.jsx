import React from 'react';
import { Link } from 'react-router-dom';
import './CareerCard.css';

const CareerCard = ({ streamKey, career }) => {
  const entrySalary = career?.salary_range_inr?.entry_level ?? '';

  return (
    <Link className="careerCard" to={`/career-paths/${streamKey}/${career.id}`}>
      <div className="careerCard__body">
        <h3 className="careerCard__title">{career.career_name}</h3>
        <div className="careerCard__meta">
          <span className="careerCard__pill">{career.category}</span>
          <span className="careerCard__pill careerCard__pill--soft">Scope: {career.scope_in_india}</span>
        </div>
        <div className="careerCard__salary">
          <span className="careerCard__salaryLabel">Entry Salary</span>
          <span className="careerCard__salaryValue">{entrySalary}</span>
        </div>
      </div>
    </Link>
  );
};

export default CareerCard;

