import { Route, Routes } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
// import TeacherHeader from "./TeacherHeader";
import ClassList from "./ClassList";
import StudentList from "./StudentList";
import AssignmentList from "./AssignmentList";
import CourseMaterials from "./CourseMaterials";
import Announcements from "./Announcements";
import TeacherCalendar from "./TeacherCalendar";

const TeacherDashboard = () => {
  return (
    //   <div className="min-h-screen flex pt-18">
    //     <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Routes>
        <Route path="/teacher" element={<TeacherSidebar />} />
        <Route path="/teacher/classes" element={<ClassList />} />
        <Route path="/teacher/students" element={<StudentList />} />
        <Route path="/teacher/assignments" element={<AssignmentList />} />
        <Route path="/teacher/course-materials" element={<CourseMaterials />} />
        <Route path="/teacher/announcements" element={<Announcements />} />
        <Route path="/teacher/calendar" element={<TeacherCalendar />} />
      </Routes>
    </div>
  );
};
export default TeacherDashboard;
