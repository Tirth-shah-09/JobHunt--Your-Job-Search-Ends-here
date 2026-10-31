import {useState,useEffect} from 'react'
import {getAllJobs} from '../api/jobApi'
import JobCard from '../components/JobCard'


const Jobs = () => {
  const [jobs,setjobs]=useState([])
  const [loading,setloading]=useState(true)
  
  useEffect(()=>{
    async function cb(){
      try{
        const data=await getAllJobs()
        setjobs(data.jobs || data)
        setloading(false);
      }
      catch(err){
        setloading(false)
      }
    }
    cb();
  },[])
  if(loading) return <div className='text center py-20'> Loading jobs,...</div>
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 '>Explore Open Jobs</h1>
      {
        jobs.length==0?(
          <p className='text-gray-500'>No jobs available at the moment</p>
        ):(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              jobs.map((job)=>
                <JobCard key={job._id} job={job}></JobCard>
              )
            }
          </div>
        )}
    </div>
  )
}

export default Jobs
