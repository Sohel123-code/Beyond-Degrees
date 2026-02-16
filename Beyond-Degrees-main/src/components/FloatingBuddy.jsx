import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FloatingBuddy.css';

const FloatingBuddy = () => {
    const location = useLocation();

    // Don't show the button if we are already on the GradBuddy page
    if (location.pathname === '/gradbuddy') return null;

    return (
        <Link to="/gradbuddy" className="floating-buddy" title="Chat with GradBuddy">
            <span className="buddy-icon">🎓</span>
            <span className="buddy-text">GradBuddy AI</span>
        </Link>
    );
};

export default FloatingBuddy;
