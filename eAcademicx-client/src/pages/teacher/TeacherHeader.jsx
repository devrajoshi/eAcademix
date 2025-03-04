import { useAuth } from "../context/AuthContext";

const TeacherHeader = () => {
  const { logout } = useAuth();
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
    </header>
  );
};
export default TeacherHeader;