require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT;
const conn = process.env.CONNECTION_STRING;

//Middleware
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({extended: true, limit: '50mb'}));


//Routes
const userRoutes = require('./routes/user.js');
const bookRoutes = require('./routes/books.js');
const cartRoutes = require('./routes/cart.js');

app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//MongoDB connection
mongoose
  .connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });
