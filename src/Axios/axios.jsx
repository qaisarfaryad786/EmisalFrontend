// src/api/axios.js
import axios from 'axios';
import { getAuthToken } from '../utils/authToken';


// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
