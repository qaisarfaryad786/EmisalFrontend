import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../utils/authToken';

const ProtectedRoute = ({ children, role }) => {
    const token = getAuthToken();
    const userRole = localStorage.getItem('role');
    const location = useLocation();

    if (!token) {
        // Check if the user is trying to access an admin route
        if (location.pathname.startsWith('/admin')) {
            return <Navigate to="/adminLogin" replace />;
        }
        return <Navigate to="/Login" replace />;
    }

    if (role && userRole !== role) {
        if (location.pathname.startsWith('/admin')) {
            return <Navigate to="/adminLogin" replace />;
        }
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default ProtectedRoute;
