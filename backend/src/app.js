const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || "*"
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        service: "SamajSaathi API",
        status: "online"
    });
});

app.get("/", (req, res) => {
    res.json({
        name: "SamajSaathi",
        message: "SamajSaathi API is running"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

module.exports = app;
