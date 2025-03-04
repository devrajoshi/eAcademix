import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users); // Send the users list
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments(); // Get count of users from MongoDB
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user count" });
  }
};

const getUserByRole = async (req, res) => {
  try {
    const { role } = req.query;
    let query = role ? { role } : {}; // If role exists, filter users by role
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const user = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameters

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    // If no user was found, send a 404 error
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Successfully deleted the user
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password); // Corrected here: user.password
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with token and user info (without password)
    res.json({ token, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  getAllUsers,
  getUserCount,
  getUserByRole,
  registerController,
  deleteUser,
  loginController,
};
