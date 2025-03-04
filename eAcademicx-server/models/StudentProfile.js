const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  class: { type: String, required: true },
  section: { type: String, required: true },
  guardianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to guardian’s User ID
  },
});

const StudentProfile = mongoose.model("StudentProfile", studentSchema);

export default StudentProfile;