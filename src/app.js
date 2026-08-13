// app.js
// basic Express application setup

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");

app.use(cors());
app.use(express.json());
// Mount the authentication routes
app.use("/api/auth", authRoutes);
// Mount the category routes
app.use("/api/categories", categoryRoutes);
// Mount the book routes
app.use("/api/books", bookRoutes);

module.exports = app;