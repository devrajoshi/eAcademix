import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/StudentDashboard";
import Classes from "../pages/student/Classes";
import Grades from "../pages/student/Grades";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/classes" element={<Classes />} />
      <Route path="/student/grades" element={<Grades />} />
    </Routes>
  );
};

export default StudentRoutes;