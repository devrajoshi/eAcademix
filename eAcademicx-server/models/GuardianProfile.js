// models/GuardianProfile.js
const guardianSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to student User IDs
    },
  ],
});

const GuardianProfile = mongoose.model("GuardianProfile", guardianSchema);

export default GuardianProfile;