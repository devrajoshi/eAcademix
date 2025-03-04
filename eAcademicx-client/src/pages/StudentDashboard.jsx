import { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    course: "BCA 7th Semester",
    rollNumber: "BCA2024001",
    profilePic: "https://via.placeholder.com/100",
  });

  const [notices, setNotices] = useState([
    { id: 1, title: "Mid-Term Exam Schedule Released", date: "2025-02-22" },
    { id: 2, title: "Project Submission Deadline Extended", date: "2025-02-20" },
  ]);

  const [upcomingExams, setUpcomingExams] = useState([
    { id: 1, subject: "Computer Networks", date: "2025-03-05" },
    { id: 2, subject: "Database Management", date: "2025-03-10" },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, activity: "Submitted Assignment on AI", date: "2025-02-15" },
    { id: 2, activity: "Attended Online Workshop on React", date: "2025-02-12" },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Student Dashboard</h2>

      {/* Student Profile */}
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
        <img
          src={student.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h3 className="text-xl font-semibold">{student.name}</h3>
          <p className="text-gray-600">{student.email}</p>
          <p className="text-gray-600">{student.course}</p>
          <p className="text-gray-600">Roll No: {student.rollNumber}</p>
        </div>
      </div>

      {/* Notices & Upcoming Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Notices Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Latest Notices</h3>
          <ul className="space-y-3">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b pb-2">
                <p className="font-medium">{notice.title}</p>
                <span className="text-sm text-gray-500">Published on: {notice.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Upcoming Exams</h3>
          <ul className="space-y-3">
            {upcomingExams.map((exam) => (
              <li key={exam.id} className="border-b pb-2">
                <p className="font-medium">{exam.subject}</p>
                <span className="text-sm text-gray-500">Date: {exam.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">Recent Activity</h3>
        <ul className="space-y-3">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p className="font-medium">{activity.activity}</p>
              <span className="text-sm text-gray-500">Date: {activity.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
