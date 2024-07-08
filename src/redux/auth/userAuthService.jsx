import api from '../../Axios/axios';
import { setToken } from "../../utils/authToken";


const API_URL = "/login";


const userLogin = async (userLoginCredentials) => {
    const response = await api.post(API_URL,userLoginCredentials);
    if(response.data)
    {
        setToken(response.data);
    }
    console.log(response.data);
    return response.data;
}

const userAuthService = {
    userLogin
}

export default userAuthService;