const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error fetching users" });
  }
};

// register users
const registerUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //check for existing user
      res.status(400).json({ message: "User already present", success: false });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); //save into db
    res.status(200).json({ message: "User registered successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error registering user", success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!(email && password)){
      return res.status(400).json({ message: "Please fill all required fields.", success: false });
    }
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not registered", success: false });
    }
    if (await bcrypt.compare(password, user.password)) {
      //generate token
      const token = jwt.sign({ email }, JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({ message: "User logged in", success: true, userDoc: {email: user.email, name: user.name, role: user.role}, token });
    } else {
      res.status(400).json({ message: "incorrect password", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!(email && password)){
      return res.status(400).json({ message: "Please fill all required fields.", success: false });
    }
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Admin not registered", success: false });
    }
    if(user.role !== 'admin'){
      return res.status(400).json({ message: "Access Denied.", success: false });
    }
    if (await bcrypt.compare(password, user.password)) {
      //generate token
      const token = jwt.sign({ email }, JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({ message: "Admin logged in", success: true, userDoc: {email: user.email, name: user.name, role: user.role}, token });
    } else {
      res.status(400).json({ message: "incorrect password", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in", success: true });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message: "User not registered", success: false });
    }
    const result = await User.deleteOne({ email });
    res.status(200).json({ message: "Deleted User successfully.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": "Error while deleting User.", success: false })
  }
}

module.exports = { getAllUsers, registerUser, loginUser, deleteUser, loginAdmin };