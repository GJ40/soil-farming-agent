// npm i cors express nodemon mongoose
const express = require("express");
const app = express();
const cors = require("cors");
const { METHODS } = require("http");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

//import routes
const userRoutes = require('./routes/userRoutes');
const soilRoutes = require('./routes/soilRoutes');
const distributorRoutes = require('./routes/distributorRoutes');
const dashbaordRoutes = require('./routes/dashbaordRoutes');

//db connection
const connect = require('./utils/db');
const corsOptions = {
    origin: ["http://localhost:5173", process.env.ORIGIN],
    credentials: true,
    METHODS: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(express.json());
app.use(cookieParser());
// app.options("*", cors(corsOptions)); // preflight support
app.use(cors(corsOptions));



app.get("/api", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// routes
app.use('/users', userRoutes);
app.use('/soils', soilRoutes);
app.use('/distributors', distributorRoutes);
app.use('/admin', dashbaordRoutes);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`server running at http://localhost:${process.env.PORT}/`);
});