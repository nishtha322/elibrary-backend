// app.js
// basic Express application setup

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use(cors());
app.use(express.json());
// Mount the authentication routes
app.use("/api/auth", authRoutes);
// Mount the category routes
app.use("/api/categories", categoryRoutes);

module.exports = app;