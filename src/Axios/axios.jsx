// src/api/axios.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
});

// Add a response interceptor
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Check if the error is due to token expiration
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token has expired') {
            // Redirect to logout or login page
            console.log(error);
        }
        return Promise.reject(error);
    }
);

export default api;
