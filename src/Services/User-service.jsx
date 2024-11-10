import { myAxios } from "./helper";

export const signup = (user)=>{
    return myAxios.post('/api/register',user).then((response)=>response.data)
};


export const loginUser = (credentials) => {
    return myAxios.post('/api/login', credentials).then((response) => response.data);
};
