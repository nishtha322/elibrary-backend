// app.js


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const readingBookmarkRoutes = require("./routes/readingBookmarkRoutes");
const highlightRoutes = require("./routes/highlightRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

app.use(cors());
app.use(express.json());
// Mount the authentication routes
app.use("/api/auth", authRoutes);
// Mount the category routes
app.use("/api/categories", categoryRoutes);
// Mount the book routes
app.use("/api/books", bookRoutes);
// Mount the download routes
app.use("/api/downloads", downloadRoutes);
// Mount the reading bookmark routes
app.use("/api", readingBookmarkRoutes); 
// Mount the highlight routes
app.use("/api", highlightRoutes);
// Mount the wishlist routes
app.use("/api", wishlistRoutes);

module.exports = app;