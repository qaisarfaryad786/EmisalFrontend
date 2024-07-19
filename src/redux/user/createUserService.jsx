import api from '../../Axios/axios';



const API_URL = "/signupUser";


const createUser = async (userDetails) => {
    const response = await api.post(API_URL,userDetails);
   if(response.data){
    return response.data;
   }
   else{
    console.error('Error,While getting response');
   }
    
}

const createUserService = {
    createUser
}

export default createUserService;