const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();


//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // const users = await User.find({ role: 'user' });
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
    if(!(name && email && password)){
      return res.status(400).json({ message: "Please fill all required fields.", success: false });
    }
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
      //generate tokens
      const accessToken = jwt.sign({ name: user.name, email: user.email, role: user.role  }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      }); 

      const refreshToken = jwt.sign({ name: user.name, email: user.email, role: user.role  }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      // create secure cookie with refreshToken
      res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: process.env.NODE_ENV === 'production', // https
        sameSite: process.env.NODE_ENV === 'production' ? 'None': 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie-expiry: set to match refreshToken
      });

      
      return res.status(200).json({ message: "User logged in", success: true, token: accessToken, userDoc: { name: user.name, role: user.role } });
    } else {
      res.status(400).json({ message: "incorrect password", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if(!cookies?.jwt){
    return res.status(401).json({ message: "Unauthorized", success: false});
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async(err, decoded) => {
      if(err) return res.status(403).json({ messsage: 'Forbidden', success: false });

      const foundUser = await User.findOne({ email: decoded.email });

      if(!foundUser) return res.status(401).json({ message: 'Unauthorized', success: false });

      const accessToken = jwt.sign(
        { name: foundUser.name, email: foundUser.email, role: foundUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.json({ token: accessToken });

    }
  );

}


const logout = async(req, res) => {
  try {
    const cookies = await req.cookies;
    // console.log(cookies);

    if(!cookies?.jwt) return res.status(204);

    const decoded = await jwt.verify(
      cookies.jwt,
      process.env.REFRESH_TOKEN_SECRET
    );
    const foundUser = await User.findOne({ email: decoded.email });

    if(!foundUser) return res.status(401).json({ message: 'Unauthorized', success: false });

    res.clearCookie('jwt', { 
      httpOnly: true, 
      sameSite: process.env.NODE_ENV === 'production' ? 'None': 'Lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ message: 'User logged out.', success: true });
  } catch (error) {
    console.log(error);
    res.status(403).json({ messsage: 'Forbidden', success: false });
  }
}

// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if(!(email && password)){
//       return res.status(400).json({ message: "Please fill all required fields.", success: false });
//     }
//     const user = await User.findOne({ email });
//     // console.log(user);
//     if (!user) {
//       return res.status(400).json({ message: "Admin not registered", success: false });
//     }
//     if(user.role !== 'admin'){
//       return res.status(400).json({ message: "Access Denied.", success: false });
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       //generate tokens
//       const accessToken = jwt.sign({ email: user.email, role: user.role  }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: "15m",
//       }); 

//       const refreshToken = jwt.sign({ email: user.email, role: user.role  }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: "7d",
//       });

//       // create secure cookie with refreshToken
//       res.cookie('jwt', refreshToken, {
//         httpOnly: true, // accessible only by web server
//         secure: true, // https
//         sameSite: 'None', // cross-site cookie
//         maxAge: 7 * 24 * 60 * 60 * 1000 // cookie-expiry: set to match refreshToken
//       });

      
//       res.status(200).json({ message: "Admin logged in", success: true, accessToken });
//     } else {
//       res.status(400).json({ message: "incorrect password", success: false });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error logging in", success: true });
//   }
// };

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message: "User not registered", success: false });
    }

    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(decoded.email === user.email || user.role === 'admin') return res.status(401).json({ message: "Unauthorized", success: false });
    
    await User.deleteOne({ email });
    res.status(200).json({ message: "Deleted User successfully.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": "Error while deleting User.", success: false })
  }
}

// Read/Search Users
const getUsers = async (req, res) => {
  try {
    const { query } = req.body;
    // console.log(query, typeof query)
    // Create a dynamic filter object
    const filter = {};

    
    // If 'query' exists, match it in either 'name' or 'email'
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ];
    }

    // Fetch matching soils from DB
    const users = await User.find(filter, { _id: 1, name: 1, email: 1, role: 1}).sort({ createdAt: -1 });

    if(!users){
      return res.status(500).json({ message: "No matching results found. "});
    }

    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch users'});
  }
};

module.exports = { getAllUsers, registerUser, loginUser, deleteUser, logout, refresh, getUsers };