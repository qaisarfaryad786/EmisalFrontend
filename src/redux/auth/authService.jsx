import api from '../../Axios/axios';
import { setToken } from "../../utils/authToken";

const API_URL_ADMIN = "/adminLogin";
const API_URL_USER = "/login";

const adminLogin = async (userData) => {
    const response = await api.post(API_URL_ADMIN, userData);
    if (response.data) {
        setToken(response.data);
        localStorage.setItem('role', 'admin');
    }

    return response.data;
};

const userLogin = async (userData) => {
    const response = await api.post(API_URL_USER, userData);
    if (response.data) {
        setToken(response.data);
        localStorage.setItem('role', 'user');

    }
    return response.data;
};

const authService = {
    adminLogin,
    userLogin
};

export default authService;
