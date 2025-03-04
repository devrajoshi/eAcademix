import { useState, useEffect } from "react";

const NoticesManagement = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    noticeType: "",
    datePublished: "",
    publishedBy: "",
  });

  // Fetch notices when the component mounts
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notices/");
        const data = await response.json();
        // console.log("Fetched Notices:", data);
        setNotices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  const addNotice = async () => {
    if (
      newNotice.title &&
      newNotice.content &&
      newNotice.noticeType &&
      newNotice.datePublished &&
      newNotice.publishedBy
    ) {
      try {
        const response = await fetch("http://localhost:5000/api/notices/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNotice),
        });

        if (response.ok) {
          const newNoticeData = await response.json();
          setNotices([...notices, newNoticeData]); // Append new notice
          setNewNotice({
            title: "",
            content: "",
            noticeType: "",
            datePublished: "",
            publishedBy: "",
          });
        } else {
          console.error("Failed to add notice");
        }
      } catch (error) {
        console.error("Error adding notice:", error);
      }
    }
  };

  const deleteNotice = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotices(notices.filter((notice) => notice._id !== id)); // Use `_id` instead of `id`
      } else {
        console.error("Failed to delete notice");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="box-border w-full h-fit px-4 lg:pl-12">
      <h2 className="text-2xl font-bold mb-4 underline">Manage Notices</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={newNotice.title}
          onChange={(e) =>
            setNewNotice({ ...newNotice, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Content"
          className="border p-2 mr-2"
          value={newNotice.content}
          onChange={(e) =>
            setNewNotice({ ...newNotice, content: e.target.value })
          }
        />
        <select
          className="border p-2 mr-2"
          value={newNotice.noticeType}
          onChange={(e) =>
            setNewNotice({ ...newNotice, noticeType: e.target.value })
          }
        >
          <option value="">Select Type</option>
          <option value="Exam">Exam</option>
          <option value="Holiday">Holiday</option>
          <option value="General">General</option>
        </select>
        <input
          type="date"
          className="border p-2 mr-2"
          value={newNotice.datePublished}
          onChange={(e) =>
            setNewNotice({ ...newNotice, datePublished: e.target.value })
          }
        />
        <select
          className="border p-2 mr-2"
          value={newNotice.publishedBy}
          onChange={(e) =>
            setNewNotice({ ...newNotice, publishedBy: e.target.value })
          }
        >
          <option value="">Select Publisher</option>
          <option value="Admin">Admin</option>
          <option value="Principal">Principal</option>
          <option value="Science Department">Science Department</option>
          <option value="Account Department">Account Department</option>
        </select>

        <button
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          onClick={addNotice}
        >
          Add Notice
        </button>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-2 dark:bg-gray-700"></hr>

      <ul className="space-y-3">
        {notices.map((notice) => (
          <li key={notice._id} className="border p-3 flex justify-between items-center">
            <span>
              {notice.title} - {notice.noticeType} (
              {new Date(notice.datePublished).toLocaleDateString("en-CA")})
            </span>

            <button
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
              onClick={() => deleteNotice(notice._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticesManagement;
