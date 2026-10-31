import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJob } from "../../api/jobApi";
import { getCompany } from "../../api/companyApi";
const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    position: "",
    experienceLevel: "",
    companyId: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function cb() {
      try {
        const data = await getCompany();
        const comp = data.company || data;
        if (comp && comp[0]._id) {
          setFormData((prev) => ({ ...prev, companyId: comp[0]._id }));
        }
      } catch (error) {}
    }
    cb();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split(",").map((r) => r.trim()),
      };
      await postJob(payload);
      navigate("/recruiter/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post Job");
    }
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Post a New Job
        </h1>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements (comma separated)
            </label>
            <input
              type="text"
              name="requirements"
              placeholder="React, Node.js, MongoDB"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <input
                type="text"
                name="jobType"
                placeholder="Full Time"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position (No. of Openings)
              </label>
              <input
                type="text"
                name="position"
                placeholder="2"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <input
                type="text"
                name="experienceLevel"
                placeholder="0-2 Years"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 mt-4"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
