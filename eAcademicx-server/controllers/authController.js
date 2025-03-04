import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save(); // save the user to the database

      res.status(201).json({
        message: "User created successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to register student", err });
    // console.error(err);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password", message: "Incorrect credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);  // Corrected here: user.password
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {  // Corrected here: user._id and user.role
      expiresIn: "1h",
    });

    // Respond with token and user info (without password)
    res.json({ token, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { registerStudent, loginController };
