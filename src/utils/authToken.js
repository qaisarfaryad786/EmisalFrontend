export const setToken = (token) =>{
    localStorage.setItem("token",JSON.stringify(token));
    
}

export const getAuthToken = () =>{
    const token = localStorage.getItem('token');
    return token;
}

