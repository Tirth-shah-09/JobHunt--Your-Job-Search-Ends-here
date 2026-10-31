import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompany } from '../../api/companyApi';
import CompanyCard from '../../components/CompanyCard';

export default function Company() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cb(){
      try {
      const response=await getCompany();
      const data=response.companies || response.company || res;
      setCompanies(Array.isArray(data) ? data : data ? [data] : []);
      setLoading(false);             
      } catch (error) {
        console.error('Failed to fetch companies', err);
        setLoading(false);
      }
    }
    cb();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading companies...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Section: Title & Register Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Companies</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all your registered organizations.</p>
        </div>
        <Link 
          to="/recruiter/company/registerCompany" 
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          + Register Company
        </Link>
      </div>

      {/* Companies List / Grid */}
      {companies.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-500 mb-4 text-base">You haven't registered any companies yet.</p>
          <Link 
            to="/recruiter/company/register" 
            className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition"
          >
            Register Your First Company
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}