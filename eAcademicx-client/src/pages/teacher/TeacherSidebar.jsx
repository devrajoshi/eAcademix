const TeacherSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-6 underline">Teacher Panel</h2>
      <ul className="space-y-4">
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "dashboard" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          💻 Dashboard
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "classes" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("classes")}
        >
          📚 My Classes
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "students" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("students")}
        >
          👨‍🎓 Students
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "assignments" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("assignments")}
        >
          📝 Assignments
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "materials" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("materials")}
        >
          📂 Course Materials
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "announcements" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("announcements")}
        >
          📢 Announcements
        </li>
        <li
          className={`cursor-pointer p-2 rounded ${
            activeTab === "calendar" ? "bg-blue-600" : ""
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          📅 Calendar
        </li>
      </ul>
    </aside>
  );
};

export default TeacherSidebar;
