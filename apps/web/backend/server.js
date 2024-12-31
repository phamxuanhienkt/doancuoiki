const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Load biến môi trường
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static('public'));

// Kết nối cơ sở dữ liệu
connectDB();

// Routes
app.use("/api", require("./router/auth"));
app.use("/api", require("./router/video"));
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
