const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/url_shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/url", urlRoutes);
app.use("/api/analytics", analyticsRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
