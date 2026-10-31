import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminJobs } from "../../api/jobApi";
import { getCompany } from "../../api/companyApi";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('in Dashboard');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobRes = await getAdminJobs();
        setJobs(jobRes.jobs || jobRes);
        try {
          const compRes = await getCompany();
          setCompany(compRes.company || compRes);
          console.log(company);
        } catch (error) {}
      } catch (error) {
        console.log("Failed to load dsahboard data ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(company)
  if (loading) {
    return <div className="text-center py-20">Loading Dashboard...</div>;
  }
  const totalApplications = jobs.reduce(
    (acc, job) => acc + (job.applications?.length || 0),
    0,
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Recruiter Dashboard
        </h1>
        <Link
          to="/recruiter/jobs/post"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700"
        >
          + Post New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 border rounded-2xl shadow-sm">
          <span className="text-sm text-gray-500 font-medium">
            Total Jobs Posted
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            {jobs.length}
          </h2>
        </div>
        <div className="bg-white p-6 border rounded-2xl shadow-sm">
          <span className="text-sm text-gray-500 font-medium">
            Total Applications Received
          </span>
          <h2 className="text-4xl font-bold text-indigo-600 mt-2">
            {totalApplications}
          </h2>
        </div>
      </div>

      {/* Company Section */}
      <div className="bg-white p-6 border rounded-2xl shadow-sm mb-8 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
            Your Companies
          </span>
          <div className="flex flex-col">
               
            {company.map((company)=>
              { return (
                company ? 
                <div className="text-xl font-bold text-gray-900 mt-1"> 
                {company.name}     
                </div>: "No Company Registered"
              )})}
            
          </div>
          
        </div>
        <Link
          to="/recruiter/company"
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50"
        >
          {company ? "Manage Companies" : "Register Company"}
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
