import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/authApi";

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    email:user?.email || '',
    bio: user?.profile.bio || "",
    skills: user?.profile?.skills ? user.profile.skills.join(", ") : "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      };
      const res = await updateProfile(payload);
      setMessage("Profile Updated Successfully");
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || "Update Failed");
    }
  };
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white p-8 border rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">User Profile</h1>
        {message && (
          <div className="bg-indigo-50 text-indigo-700 p-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Java, React, Node.js"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
