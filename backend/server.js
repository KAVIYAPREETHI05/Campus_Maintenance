const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

require("dotenv").config();
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Kaviya@05",
  database: process.env.DB_NAME || "woorker_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Add Worker API
app.post("/api/workers", (req, res) => {
  const { name, natureOfWork, email, password, experience, mobile } = req.body;

  if (!name || !natureOfWork || !email || !password || !experience || !mobile) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO workers (name, natureOfWork, email, password, experience, mobile) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, natureOfWork, email, password, experience, mobile], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(201).json({ message: "Worker added successfully", workerId: result.insertId });
  });
});

// Get All Workers API
app.get("/api/workers", (req, res) => {
  db.query("SELECT * FROM workers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.json(results);
  });
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
