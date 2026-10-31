import API from './axiosInstance.js'

export const registerUser= async(formData)=>{
    const response= await API.post('/user/register',formData,{
        headers:{'Content-Type':'multipart/form-data'}
    })
    return response.data;
}

export const loginUser= async(credentials)=>{
    const response= await API.post('/user/login',credentials);
    console.log(response.data)
    return response.data;
}

export const logoutuser=async()=>{
    const response= await API.get('/user/logout');
    return response.data;
}

export const updateProfile = async(profileData)=>{
    const response= await API.put('/user/profile/update',profileData);
    return response.data;
}