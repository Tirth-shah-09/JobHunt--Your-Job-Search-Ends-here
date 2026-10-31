import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../api/companyApi';

export default function RegisterCompany() {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    location: '',
    website: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Sends request to POST /company/registercompany
      const response = await registerCompany(formData);
      setSuccess(response.message || 'Company registered successfully!');
      
      // Redirect to company profile or dashboard after short delay
      setTimeout(() => {
        navigate('/recruiter/company');
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register company. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Register Your Company</h1>
        <p className="text-sm text-gray-500 mb-6">Provide your company details to start posting job vacancies.</p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input 
              type="text" 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleChange} 
              required 
              placeholder="e.g. ABC Technologies"
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
              placeholder="Brief description about your company..."
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
              placeholder="e.g. Ahmedabad, India"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input 
              type="url" 
              name="website" 
              value={formData.website} 
              onChange={handleChange} 
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
}