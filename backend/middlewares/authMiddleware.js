const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

//authorisation to check if admin is logged in
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const adminAuth = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");
    try {
      //decode the token
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      // console.log(decoded);
      // get user by email
      const user = await User.findOne({ email: decoded.email });
      if (user.role !== "admin") {
        res.status(400).json({ message: "Only admins can add" });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userAuth = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");
    try {
      //decode the token
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      // console.log(decoded);
      // get user by email
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        res.status(400).json({ message: "Access Permission denied." });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = { adminAuth, userAuth };