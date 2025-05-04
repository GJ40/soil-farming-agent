const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//db connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (err) {
    console.log("error in connection");
    console.log(err);
  }
};

module.exports = connect;
