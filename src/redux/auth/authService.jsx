import axios from "axios";
import api from '../../Axios/axios';

const API_URL = "/adminLogin";

const adminLogin = async (userData)=>{
    const response = await api.post(API_URL,userData);
    if(response.data)
    {
        localStorage.setItem("user",JSON.stringify(response.data));
    }
    console.log("Message from server",response.data.message);
    return response.data;

}

const authService = {
    adminLogin
}

export default authService;