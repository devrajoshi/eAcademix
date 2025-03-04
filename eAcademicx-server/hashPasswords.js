import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // Adjust path based on your project structure

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

const hashPasswords = async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      if (!user.password.startsWith("$2a$")) {
        // Check if password is already hashed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Update the user with the hashed password
        await User.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );

        console.log(`Updated password for: ${user.email}`);
      }
    }
    console.log("Password hashing completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error hashing passwords:", error);
  }
};

hashPasswords();
