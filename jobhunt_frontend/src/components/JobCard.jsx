import React from 'react'
import {Link} from 'react-router'
import { useAuth } from '../context/AuthContext'
const JobCard = ({job}) => {
  const {role}=useAuth();
  return (
    
     <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition'>
        <div className='flex justify-between items-start mb-4'>
            <div>
                <h3 className='text-lg font-bold text-gray-900 '>{job.title}</h3>
                <p className='text-sm text-indigo-600 font-medium'>{job.company?.name || 'Company'}</p>
            </div>
            <span className='bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-medium'>
                {job.jobType}</span>
        </div>
        <p className='text-gray-600 text-sm mb-4 line-clamp-2 '>{job.description}</p>
        <div className='flex flex-wrap gap-2 mb-4'>
            <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>📍 {job.location}</span>
            <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>💼 {job.experienceLevel}</span>
            <span className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>👥 {job.position}</span>

        </div>
        <div className='flex flex-col gap-2'>
        {role=='recruiter' && 
        <Link to={`/recruiter/jobs/${job._id}/applicants`} className='block text-center bg-indigo-600 text-white text-sm py-2 rounded-lg font-medium hover:bg-indigo-700 '>View Applicants</Link>}
        <Link to={`/jobs/${job._id}`} className='block text-center bg-indigo-600 text-white text-sm py-2 rounded-lg font-medium hover:bg-indigo-700 '>
        View Details
        </Link>
        </div>
     </div>
    
  )
}

export default JobCard
