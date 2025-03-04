import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Login from "./pages/Loginn";
import About from "./pages/About";
import Notice from "./pages/Notice";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
// import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ClassList from "./pages/teacher/ClassList"
import StudentList from "./pages/teacher/StudentList"
import TeacherCalendar from "./pages/teacher/TeacherCalendar"
import StudentDashboard from "./pages/StudentDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";
import NotFound from "./pages/NotFound"; // Create this component for 404 errors

function App() {
  // Add Protected Route Wrapper (preserve your existing code)
  const ProtectedRoute = ({ children, requiredRole }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user?.role) {
        setIsAuthenticated(true);
        setUserRole(user.role);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>; // Add a proper loading spinner
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />; // Create Unauthorized page
    }

    return children;
  };

  // Preserve your existing routes and add new ones
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Existing Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Role-Based Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="student"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="guardian"
          element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianDashboard />
            </ProtectedRoute>
          }
        />

        {/* Error Handling Routes */}
        <Route path="/unauthorized" element={<div>403 - Access Denied</div>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
