import axios from "axios";
import api from '../../Axios/axios';
import { setToken } from "../../utils/authToken";


const API_URL = "/adminLogin";

const adminLogin = async (userData)=>{
    const response = await api.post(API_URL,userData);
    if(response.data)
    {
        setToken(response.data);
    }

    console.log("Message from server",response.data.message);
    return response.data;

}



const authService = {
    adminLogin
}

export default authService;