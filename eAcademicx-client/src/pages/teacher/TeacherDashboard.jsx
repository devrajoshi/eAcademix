import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import ClassList from "./ClassList";
import StudentList from "./StudentList";
import AssignmentList from "./AssignmentList";
import CourseMaterials from "./CourseMaterials";
import Announcements from "./Announcements";
import TeacherCalendar from "./TeacherCalendar";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [classCount, setClassCount] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch class and student count from backend
  // useEffect(() => {
  //   const fetchCounts = async () => {
  //     try {
  //       const classResponse = await axios.get(
  //         "http://localhost:5000/api/classes/count"
  //       );
  //       const studentResponse = await axios.get(
  //         "http://localhost:5000/api/students/count"
  //       );

  //       setClassCount(classResponse.data.count);
  //       setStudentCount(studentResponse.data.count);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching counts:", err);
  //       setLoading(false);
  //     }
  //   };
  //   fetchCounts();
  // }, []);

  return (
    <div className="min-h-screen flex pt-18">
      {/* Sidebar */}
      <TeacherSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-6 my-6 ml-64 max-w-full">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Teacher Dashboard</h2>
            {loading ? (
              <div>Loading data...</div>
            ) : (
              <div className="grid grid-cols-2 gap-16">
                <div className="bg-white p-6 rounded shadow-md">
                  <h3 className="text-xl font-semibold">Assigned Classes</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {classCount}
                  </p>
                </div>
                <div className="bg-white p-6 rounded shadow-md">
                  <h3 className="text-xl font-semibold">Total Students</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {studentCount}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "classes" && <ClassList />}
        {activeTab === "students" && <StudentList />}
        {activeTab === "assignments" && <AssignmentList />}
        {activeTab === "materials" && <CourseMaterials />}
        {activeTab === "announcements" && <Announcements />}
        {activeTab === "calendar" && <TeacherCalendar />}
      </main>
    </div>
  );
};

export default TeacherDashboard;
