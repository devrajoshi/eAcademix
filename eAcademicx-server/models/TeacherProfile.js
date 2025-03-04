// models/TeacherProfile.js
const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subjects: [{ type: String }],
  classTeacherOf: { type: String }, // e.g., "Class 10A"
});

const TeacherProfile = mongoose.model("TeacherProfile", teacherSchema);

export default TeacherProfile;
