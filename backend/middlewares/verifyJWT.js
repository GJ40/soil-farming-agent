const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const verifyJWT = async(req, res, next) => {
    try {
        const token = req.header("Authorization");

        if(!token) return res.status(401).json({ message: "Unauthorized", success: false});

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded);
        if(decoded){
            next();
        }
        
        

    } catch (error) {
        // console.log(error);
        res.status(403).json({ message: "Forbidden", success: false})
    }
}


module.exports = verifyJWT