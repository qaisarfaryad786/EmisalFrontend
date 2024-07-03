// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/authToken';

const ProtectedRoute = ({ children }) => {
    const token = getAuthToken();

    if (!token) {
        return <Navigate to="/adminLogin" replace />;
    }

    return children;
};

export default ProtectedRoute;
