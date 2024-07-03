// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../api/axios'; // Adjust the import path as needed

const useAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            navigate('/login'); // Redirect to login if no token
        }
    }, [navigate]);
};

export default useAuth;
