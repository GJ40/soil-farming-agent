const User = require("../models/User");
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  // console.log(req.body);
  try {
    const name = "Admin";
    const email = "admin@email.com";
    const password = "admin";
    const role = "admin";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //check for existing user
      console.log("Account already present");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save(); //save into db
    console.log("Admin registered successfully");
  } catch (err) {
    console.log(err);
    console.log("error registering admin");
  }
}

module.exports = { createAdmin };