import { useState, useEffect } from "react";
import axios from "axios";
import UsersManagement from "../components/UsersManagement";
import NoticesManagement from "../components/NoticesManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userCount, setUserCount] = useState(null); // Store the user count
  const [noticeCount, setNoticeCount] = useState(null); // Store the notice count
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user count and notice count from backend
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:5000/api/users/count"
        ); // API for user count
        const noticeResponse = await axios.get(
          "http://localhost:5000/api/notices/count"
        ); // API for notice count

        setUserCount(userResponse.data.count); // Set user count
        setNoticeCount(noticeResponse.data.count); // Set notice count
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        console.error("Error fetching counts:", err);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen flex pt-18">
      <div className="">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
          <h2 className="text-2xl font-bold mb-6 underline">Admin Panel</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded ${
                activeTab === "dashboard" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${
                activeTab === "users" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              Manage Users
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${
                activeTab === "notices" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("notices")}
            >
              Manage Notices
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 my-6 ml-64 max-w-full">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
              {loading ? (
                <div>Loading counts...</div>
              ) : (
                <div className="grid grid-cols-2 gap-16">
                  <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Total Users</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {userCount}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold">Total Notices</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {noticeCount}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "users" && <UsersManagement />}
          {activeTab === "notices" && <NoticesManagement />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
