import { useEffect, useState } from "react";
import { getAppliedJobs } from "../api/applicationApi";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("IN Applied Jobs");
  useEffect(() => {
    async function cb() {
      try {
        const data = await getAppliedJobs();
        const applications = data.application || data.applications || data;
        setApplications(applications);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    cb();
  }, []);
  if (loading)
    return <div className="text-center py-20">Loading applications...</div>;
  return (
    <>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">My Applications</h1>
        {applications.length === 0 ? (
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 border rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.job?.title || "Job Position"}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium">
                    {item.job?.company?.name || "Company"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Applied on: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                    item.status === "rejected"
                      ? "bg-red-50 text-red-600"
                      : item.status === "pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AppliedJobs;
