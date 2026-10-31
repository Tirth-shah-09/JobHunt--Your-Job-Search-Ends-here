import API from './axiosInstance.js';

export const postJob= async(jobData)=>{
    const response= await API.post('/job/postjob',jobData);
    return response.data;
}

export const getAllJobs= async()=>{
    const response= await API.get(`/job/getalljobs`);
    return response.data;
}

export const getJobById= async(id)=>{
    const response= await API.get(`/job/getjob/${id}`);
    return response.data;
}

export const getAdminJobs= async()=>{
    const response= await API.get('/job/getadminjob');
    return response.data
}

export const updateJob= async(id,jobData)=>{
    const response= await API.post();
    return response.data;
}

