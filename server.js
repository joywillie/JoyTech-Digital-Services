const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
    res.json({
        status: "online",
        business: "JoyTech Digital Services API",
        owner: "Joyce William"
    });
});


// Authentication routes
app.use(
    "/api/auth",
    authRoutes
);


// Services routes
app.use(
    "/api/services",
    serviceRoutes
);


// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `JoyTech API running on port ${PORT}`
    );
});
