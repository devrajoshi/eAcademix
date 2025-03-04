import Notices from "../models/Notices.js";

const getAllNotices = async (req, res) => {
  try {
    const notices = await Notices.find().select();
    res.status(200).json(notices); // Send the notices list
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notices", error: err.message });
  }
};

// Get total count of notices
const getNoticeCount = async (req, res) => {
  try {
    const count = await Notices.countDocuments(); // Get count of notices from MongoDB
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notice count" });
  }
};

const addNotice = async (req, res) => {
  try {
    const { title, content, noticeType, datePublished, publishedBy, isActive } =
      req.body;

    // Check if title already exists
    const existingNotice = await Notices.findOne({ title });
    if (existingNotice) {
      return res.status(400).json({ error: "Notice already exists" });
    }

    // Format the datePublished to 'YYYY-MM-DD' format
    const formattedDatePublished = new Date(datePublished)
      .toISOString()
      .split("T")[0];

    // Create and save the notice
    const newNotice = new Notices({
      title,
      content,
      noticeType,
      datePublished: formattedDatePublished, // Store formatted date
      publishedBy,
      isActive,
    });

    await newNotice.save();
    res.status(201).json(newNotice); // Return saved notice with formatted date
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// const deleteNotice = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       setNotices(notices.filter((notice) => notice.id !== id));
//     } else {
//       console.error("Failed to delete notice");
//     }
//   } catch (error) {
//     console.error("Error deleting notice:", error);
//   }
// };

export { getAllNotices, getNoticeCount, addNotice };
