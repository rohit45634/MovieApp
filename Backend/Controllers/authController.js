import express from "express";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import User from "../models/userSchema.js";

// SIGNUP
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: error.message || "Error registering user",
    });
  }
};

// LOGIN
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // !validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Enter All field Require" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    const token = genToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true if using HTTPS
      sameSite: "None",
    });

    return res.status(200).json({
      message: "login successfully",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login  Error" });
  }
};

export const LogOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

//current User
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
