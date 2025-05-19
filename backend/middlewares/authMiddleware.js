const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

//authorisation to check if admin is logged in;
const adminAuth = async (req, res, next) => {
    const token = req.header("Authorization");
    // console.log(token)
    if (!token) return res.status(401).send("Access Denied");
    try {
      //decode the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
    const token = await req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findOne({ email: decoded.email });
      if (!user) return res.status(403).json({ message: "Access Permission denied." });
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token", success: false });
    }
  };
  

  module.exports = { adminAuth, userAuth };