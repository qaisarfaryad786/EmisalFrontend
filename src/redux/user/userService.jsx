import api from '../../Axios/axios';

const API_URL = "/getUsers";

const fetchUsers = async ()=> {
    const response = await api.get(API_URL);
    return response.data;

}

const userService = {
    fetchUsers
}

export default userService;