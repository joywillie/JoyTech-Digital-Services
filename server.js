const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    business: "JoyTech Digital Services API",
    owner: "Joyce William",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Protected route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "You are authorized 🚀",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
