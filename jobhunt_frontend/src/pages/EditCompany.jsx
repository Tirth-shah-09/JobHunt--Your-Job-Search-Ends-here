import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCompanyById, updateCompany } from '../api/companyApi';

export default function EditCompany() {
  const { id } = useParams(); // Company ID from route
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    logo: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch existing company details on mount
  useEffect(() => {
    getCompanyById(id)
      .then((res) => {
        const company = res.company || res;
        if (company) {
          setFormData({
            name: company.name || '',
            description: company.description || '',
            location: company.location || '',
            website: company.website || '',
            logo: company.logo || ''
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch company details', err);
        setError('Failed to load company data.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Sends request to PUT /company/update/:id
      await updateCompany(id, formData);
      setSuccess('Company updated successfully!');
      
      // Redirect back to company page after a brief moment
      setTimeout(() => {
        navigate('/recruiter/company');
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update company. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading company details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Company</h1>
            <p className="text-sm text-gray-500 mt-0.5">Update your organization's information.</p>
          </div>
          <Link 
            to="/recruiter/company" 
            className="text-sm text-gray-600 hover:text-indigo-600 font-medium"
          >
            ← Back to Companies
          </Link>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="4" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
            <input 
              type="url" 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
            <input 
              type="text" 
              name="logo" 
              value={formData.logo} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button 
              type="submit" 
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
            <Link 
              to="/recruiter/company" 
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 text-center transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}