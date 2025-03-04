import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Get user role from context

  // Role-based menu items configuration
  const roleBasedMenuItems = {
    admin: [
      { label: "Manage Users", path: "/admin/users" },
      { label: "Reports", path: "/admin/reports" },
    ],
    teacher: [
      //   { label: "Classes", path: "/teacher/classes" },
      //   { label: "Students", path: "/teacher/students" },
      //   { label: "Calendar", path: "/teacher/calendar" },
    ],
    student: [
      { label: "Classes", path: "/student/classes" },
      { label: "Grades", path: "/student/grades" },
    ],
    guardian: [
      { label: "Student Progress", path: "/guardian/progress" },
      { label: "Messages", path: "/guardian/messages" },
    ],
  };

  // Determine dynamic home link based on user role
  const getHomeRoute = () => {
    if (!isAuthenticated || !user) return "/";
    switch (user.role) {
      case "admin":
        return "/admin";
      case "teacher":
        return "/teacher";
      case "student":
        return "/student";
      case "guardian":
        return "/guardian";
      default:
        return "/";
    }
  };

  // Shared menu items for all roles
  const sharedMenuItems = [
    { label: "Home", path: getHomeRoute() },
    { label: "About", path: "/about" },
    { label: "Notice", path: "/notice" },
    { label: "Features", path: "/features" },
    { label: "Contact", path: "/contact" },
  ];

  // Handle logout functionality
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout(); // Call logout function from context
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md fixed">
      {/* Logo - Left side */}
      <Link to={getHomeRoute()} className="text-2xl font-bold text-blue-600">
        eAcademix
      </Link>

      {/* Navigation Links - Centered */}
      <div className="flex-1 flex justify-center items-center space-x-8">
        {/* Role-specific menu items */}
        {(roleBasedMenuItems[user?.role] || [])
          .concat(sharedMenuItems)
          .map(({ label, path }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600 font-medium" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
      </div>

      {/* Authentication Button - Right Side */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
