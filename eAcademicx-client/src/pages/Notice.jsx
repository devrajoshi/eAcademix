import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notices") // Replace with your actual API URL
      .then((response) => {
        setNotices(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch notices. Please try again later.");
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading Notices...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 m-8">
        Latest Notices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-white shadow-lg rounded-xl p-5 transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {notice.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">{notice.content}</p>

            <div className="flex items-center mt-4 text-gray-500 text-sm">
              <FaRegCalendarAlt className="mr-2" />
              <span>{formatDate(notice.datePublished)}</span>{" "}
              {/* Display formatted date */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
