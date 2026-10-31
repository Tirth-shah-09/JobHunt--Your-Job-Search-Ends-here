import { useState, useEffect } from 'react';
import API from '../api/axiosInstance'; 
import { useAuth } from '../context/AuthContext';
import {Link } from 'react-router-dom'
export default function CompanyCard({ company }) {
  const url=`/recruiter/company/editCompany/${company._id}`
  const userData=useAuth();
  let ownerName='We are loading it yet'
 
  if(userData && userData.user && userData.user.fullName){
    ownerName=userData.user.fullName
  }
  const { name, userId, location, website } = company;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition">
      {/* Company Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">{name}</h3>

      {/* Information List */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Owner:</span>
          <span className="text-gray-900 font-semibold">{ownerName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Location:</span>
          <span className="text-gray-700">{location || 'Not Specified'}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Website:</span>
          {website ? (
            <a 
              href={website} 
              target="_blank" 
              rel="noreferrer" 
              className="text-indigo-600 font-medium hover:underline truncate max-w-[200px]"
            >
              {website}
            </a>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
        <div className='flex justify-end'>
         <Link 
          to={`/recruiter/company/editCompany/${company._id}`}
          className="bg-yellow-600 text-white px-2.5 py-1.5 rounded-xl font-medium hover:bg-yellow-700 transition shadow-sm "
        >
          Edit Details
        </Link>
        </div>
      </div>
    </div>
  );
}