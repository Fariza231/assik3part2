// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Import routes
const recipeRoutes = require("./routes/recipeRoutes");

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static("public"));

/*
  Connect to MongoDB
  - Database "recipes" will be created automatically
*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "homePage.html"));
});

// Recipes page (UI only)
app.get("/api/recipes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "recipes.html"));
});

// Create page
app.get("/api/createRecipe", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "createRecipe.html"));
});

// Update page
app.get("/api/updateRecipe", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "updateRecipe.html"));
});

// API routes
app.use("/api", recipeRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
