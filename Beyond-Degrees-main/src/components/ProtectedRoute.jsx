import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Simple check for token existence. 
    // For more security, we could verify token expiry here or via an API call,
    // but existence is sufficient for client-side routing protection.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
