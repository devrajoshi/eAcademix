import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  noticeType: {
    type: String,
    enum: ["Exam", "Holiday", "Event", "Announcement", "Other"], // Types of notices
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now, // Automatically set to current date and time if not provided
  },
  publishedBy: {
    type: String, // Optional field to store the name of the user who published the notice
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true, // This allows you to mark notices as inactive if needed
  },
});

const Notices = mongoose.model("Notices", noticeSchema);

export default Notices;
