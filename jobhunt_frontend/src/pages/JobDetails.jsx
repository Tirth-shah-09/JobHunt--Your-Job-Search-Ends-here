import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../api/jobApi';
import {applyJob} from '../api/applicationApi'
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const {id}=useParams();
  const [job,setJob]=useState(null);
  const [applied,setApplied]=useState(false)
  const [message,setMessage]=useState('');
  const {role}=useAuth()
  useEffect(()=>{
    async function cb(){
      try {
      const data=await getJobById(id);
      // console.log(data);
      setJob(data.job || data);
       } catch (error) {
         setMessage(error.message || 'An error occured while getting the job');
      }
    }
    cb();
  },[id])
  const handleApply=async()=>{
    try {
      const res=await applyJob(id);
      setApplied(true);
      setMessage(res.message || "Applied Successfully")
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to apply')
    }
  }

  if(!job){
    if(message){
      return ( <div className='bg-indigo-50 text-indigo-700 p-3 rounded-lg mb-4 text-sm'>
      {message}
    </div>)
    }
    return (
      <div className='text-center py-20'>Loading job details..,</div>
    )
  }
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <div className='bg-white border border-gray-200 p-8 rounded-2xl shadow-sm'>
        <h1 className='bg-white border border-gray-200 p-8 rounded-2xl shadow-sm'> {job.title} </h1>
        <p className='text-indigo-600 font-semibold mb-4'>{job.company?.name}</p>
        {message && <div className='bg-indigo-50 text-indigo-700 p-3 rounded-lg mb-4 text-sm'>{message}</div>}
        <div className='grif grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-xl'>
          <div><span className='text-xs text-gray-500 block '>Position</span><span className='font-medium'>{job.position}</span></div>
          <div><span className='text-xs text-gray-500 block'>Job Type</span><span className='font-medium'>{job.jobType}</span></div>
          <div><span className='text-xs text-gray-500 block'>Experience</span><span className='font-medium'>{job.experienceLevel}</span></div>
        </div>
        <h3 className='text-xl font-bold mb-2'>Job Description</h3>
        <p className='text-gray-700 mb-6 '>{job.description}</p>
        <h3 className='text-xl font-bold mb-2'>Requirements</h3>
        <ul className='list-disc pl-5 mb-8 space-y-1 text-gray-700'>
          {
            job.requirements?.map((req,index)=>{
              return <li key={index}>{req}</li>
            })
          }
        </ul>
        {
          role==='student' && (
            <button onClick={handleApply} disabled={applied} className={`w-full py-3 rounded-xl font-medium text-white ${applied?'bg-green-600':'bg-indigo-600 hover:bg-indigo-700'}`}>
              {applied?'Applied Successfully' :'Apply Now'}
              
            </button>
          )
          
        }
      </div>
    </div>
  )
}

export default JobDetails
