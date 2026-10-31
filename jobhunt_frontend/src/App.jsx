import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Jobs from './pages/Jobs.jsx'
import JobDetails from './pages/JobDetails.jsx';
import AppliedJobs from './pages/AppliedJobs.jsx';
import Profile from './pages/Profile.jsx'


import RecruiterDashboard from './pages/recruiter/Dashboard.jsx';
import MyJobs from './pages/recruiter/MyJobs.jsx'
import PostJob from './pages/recruiter/PostJob.jsx'
import Company from './pages/recruiter/Company.jsx'
import Applicants from './pages/recruiter/Applicants.jsx'
import RegisterCompany from './pages/RegisterCompany.jsx';
import EditCompany from './pages/EditCompany.jsx';


const App = () => {
  return  (
    
      <BrowserRouter>
      <Navbar/>
      <Routes>
        {/*Public/Auth*/}
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/>

        {/*Student Routes */}
        <Route path='/jobs' element={<ProtectedRoute allowedRole='student'><Jobs/></ProtectedRoute>}/>
        <Route path='/jobs/:id' element={<ProtectedRoute allowedRole='student'><JobDetails/></ProtectedRoute>}/>
        <Route path='/applied-jobs' element={<ProtectedRoute allowedRole='student'><AppliedJobs/></ProtectedRoute>}/>

        {/*Recruiter Routes*/}
        <Route path='/recruiter/dashboard' element={<ProtectedRoute allowedRole='recruiter'><RecruiterDashboard/></ProtectedRoute>}/>
        <Route path='/recruiter/jobs' element={<ProtectedRoute allowedRole='recruiter'><MyJobs/> </ProtectedRoute>}/>
        <Route path='/recruiter/jobs/post' element={<ProtectedRoute allowedRole='recruiter'><PostJob/></ProtectedRoute>}/>
        <Route path='/recruiter/company' element={<ProtectedRoute allowedRole='recruiter'><Company/></ProtectedRoute>}></Route>
        <Route path='/recruiter/jobs/:jobId/applicants' element={<ProtectedRoute allowedRole='recruiter'><Applicants/></ProtectedRoute>}/>
        <Route path='/recruiter/company/registerCompany' element={<ProtectedRoute allowedRole='recruiter'><RegisterCompany/></ProtectedRoute>}/>
        <Route path='/recruiter/company/editCompany/:id' element={<ProtectedRoute allowedRole='recruiter'><EditCompany/></ProtectedRoute>}/>

        {/* Common */}
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='*' element={<Jobs/>}/>
      </Routes>
      </BrowserRouter>
   
    
  )
}

export default App
