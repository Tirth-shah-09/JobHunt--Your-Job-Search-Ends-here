import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicants } from '../../api/applicationApi';
import { updateApplications,deleteApplication } from '../../api/applicationApi';

const Applicants = () => {
  const {jobId}=useParams()
  const [applicants,setApplicants]=useState([])
  
  useEffect(()=>{
      async function cb(){
        const data=await getApplicants(jobId);
        
        setApplicants(data.job?.applications || data.applications || [])
       
      }
      cb();
  },[jobId])

  const handleStatusUpdate=async(appId ,status)=>{
    try {
      if(status=='approved'){
      await updateApplications(appId,status);
      }
      if(status=='rejected'){
        await deleteApplication(appId);
      }
      console.log(applicants)
      setApplicants(applicants.map((app)=>{
        if(app._id==appId){
          if(status=='rejected') return
        }
        return app
      }
      ))
    } catch (error) {
      console.log(error); 
      alert('Failed to update status');
    }
    
  }
  console.log(applicants)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Applicants ({applicants.length})</h1>
      <div className="space-y-4">
        {applicants?.map((item) => {
          return  (
          <div key={item._id} className="bg-white p-6 border rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-lg">{item.applicant?.fullName}</h3>
              <p className="text-sm text-gray-600">{item.applicant?.email}</p>
              <p className="text-xs text-gray-500 mt-1">Status: <span className="font-semibold uppercase text-indigo-600">{item.status}</span></p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleStatusUpdate(item._id, 'approved')} className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded text-sm font-medium">Approve</button>
              <button onClick={() => handleStatusUpdate(item._id, 'rejected')} className="bg-red-50 text-red-600 px-3 py-1.5 rounded text-sm font-medium">Reject</button>
            </div>
          </div>
          )  
        }       
        )}
      </div>
    </div>
  )
}

export default Applicants
