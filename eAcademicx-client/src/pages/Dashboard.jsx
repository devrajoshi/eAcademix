import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login"); // Redirect to login if no token
    } else {
      setUser(JSON.parse(userData)); // Set user state
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600 mt-2">Role: {user.role}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
