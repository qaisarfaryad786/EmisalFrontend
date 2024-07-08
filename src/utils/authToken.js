export const setToken = (token) =>{
    localStorage.setItem("token",JSON.stringify(token));
    
}



export const getAuthToken = () => {
    const tokenObj = localStorage.getItem('token'); // Assuming the token is stored as a JSON string
    if (tokenObj) {
        const parsedTokenObj = JSON.parse(tokenObj);
        return parsedTokenObj.token;
    }
    return null;
}

