import React from "react";
import { Routes, Route } from "react-router-dom";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import Announcements from "../pages/teacher/Announcements";
import TeacherCalendar from "../pages/teacher/TeacherCalendar";
// import TeacherSidebar from "../pages/teacher/TeacherSidebar";
// import ClassList from "../pages/teacher/ClassList";
// import CourseMaterials from "../pages/teacher/CourseMaterials";
// import StudentList from "../pages/teacher/StudentList";
// import Grades from "../pages/teacher/Grades";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/classes" element={<Classes />} />
      <Route path="/teacher/announcements" element={<Announcements />} />
      <Route path="/teacher/calendar" element={<TeacherCalendar />} />
    </Routes>
  );
};

export default TeacherRoutes;