// npm i cors express nodemon mongoose
const express = require("express");
const app = express();
const cors = require("cors");
const { METHODS } = require("http");
const dotenv = require('dotenv');

dotenv.config();

//import routes
const userRoutes = require('./routes/userRoutes');
const soilRoutes = require('./routes/soilRoutes');
const distributorRoutes = require('./routes/distributorRoutes');

//db connection
const connect = require('./utils/db');

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    METHODS: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/api", (req, res) => {
  res.json({ message: "Hello, World!" });
});
app.use(express.json());

app.use('/users', userRoutes);
app.use('/soils', soilRoutes);
app.use('/distributors', distributorRoutes);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`server running at http://localhost:${process.env.PORT}/`);
});