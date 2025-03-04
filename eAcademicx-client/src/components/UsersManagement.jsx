import { useState, useEffect } from "react";
import axios from "axios";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState(""); // Default: Fetch all users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  // Fetch users based on role
  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/role?role=${roleFilter}`
      );
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        newUser
      );
      setUsers([...users, response.data]); // Add new user to the list
      setNewUser({ name: "", role: "", email: "", password: "" });
      alert("User added successfully!");
    } catch {
      setError("Error adding user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully!");
    } catch {
      setError("Error deleting user");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="box-border w-full h-fit px-4 lg:pl-12">
      <h2 className="text-2xl font-bold mb-4 underline">Manage Users</h2>

      {/* Add User Form */}
      <form className="mb-4" onSubmit={addUser}>
        <div className="rounded-md space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mr-2"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="border p-2 mr-2"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mr-2"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mr-2"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Add User
          </button>
        </div>
      </form>

      <hr className="h-px my-4 bg-gray-200 border-2 dark:bg-gray-700" />
      {/* Role Filter Dropdown */}
      <label className="block mb-2 font-semibold">Filter by Role:</label>

      <span>
        <select
          className="border p-2 mb-4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="guardian">Guardian</option>
        </select>
      </span>
      <hr className="h-px my-4 bg-gray-200 border-2 dark:bg-gray-700" />

      {/* User List */}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user._id} className="border p-3 flex justify-between items-center">
              <span>
                {user.name} ({user.email})
              </span>
              <span>{user.role}</span>
              <button
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersManagement;
