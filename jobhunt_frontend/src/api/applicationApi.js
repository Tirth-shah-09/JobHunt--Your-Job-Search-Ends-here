
import API from './axiosInstance.js'

export const applyJob= async(jobId)=>{
    const response= await API.post(`/application/apply/${jobId}`);
    return response.data
}

export const getAppliedJobs= async()=>{
    const response= await API.get('/application/get');
    return response.data
}

export const getApplicants= async(jobId)=>{
    const response= await API.get(`/application/${jobId}/applicants`);
    console.log(response.data)
    return response.data;
}

export const updateApplications=async(applicationId,status)=>{
    const response=await API.post(`/application/status/${applicationId}/update`,{status});
    return response.data;
}   

export const deleteApplication=async(applicationId)=>{
    const response=await API.delete(`/application/delete/${applicationId}`);
    return response.data;
}
