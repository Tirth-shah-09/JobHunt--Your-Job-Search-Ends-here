import axios from 'axios';

const API= axios.create({
    baseURL: 'http://localhost:8000',//our backend base URL
    withCredentials:true //the authentication cookie that the browser has stored
    //that cookie will be allowed to send with the request
})

API.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status==401){
            localStorage.removeItem('jobhunt_user')

            if(window.location.pathname!=='/login'){
                window.location.href='/login'
            }
        }
        return Promise.reject(error)
    }
)

export default API