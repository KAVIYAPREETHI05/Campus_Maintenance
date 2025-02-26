const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

require("dotenv").config();
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json());

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

//------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------------------------------------
// Get All Workers API
app.get("/api/workers", (req, res) => {
  db.query("SELECT * FROM workers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.json(results);
  });
});


// Delete worker
app.delete("/api/workers/:id", (req, res) => {
  const workerId = req.params.id;
  db.query("DELETE FROM workers WHERE id = ?", [workerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.json({ message: "Worker deleted successfully!" });
  });
});

//----------------------------------------------------------------------------------------------------------------------
// assignTask Page

app.post("/api/assign-task", (req, res) => {
  const { description, natureOfWork, numberOfWorkers, workers, estimatedHours, estimatedMinutes, location } = req.body;
  
  const workersStr = JSON.stringify(workers); // Store array as JSON string

  const sql = `INSERT INTO tasks (description, natureOfWork, numberOfWorkers, workers, estimatedHours, estimatedMinutes, location) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [description, natureOfWork, numberOfWorkers, workersStr, estimatedHours, estimatedMinutes, location], (err, result) => {
    if (err) {
      console.error("Error assigning task:", err);
      return res.status(500).json({ error: "Failed to assign task." });
    }
    res.status(201).json({ message: "Task assigned successfully!" });
  });
});

// Fetch All Tasks API
app.get("/api/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res.status(500).json({ error: "Failed to fetch tasks." });
    }
    
    // Convert stored worker string back to array
    results.forEach((task) => {
      task.workers = JSON.parse(task.workers);
    });

    res.json(results);
  });
});


//-----------------------------------------------------------------------------------------
//Task Status
// Fetch All Tasks API (Including Status)
app.get("/api/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res.status(500).json({ error: "Failed to fetch tasks." });
    }

    results.forEach((task) => {
      task.workers = JSON.parse(task.workers);
    });

    res.json(results);
  });
});


app.put("/api/update-task-status/:id", (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, taskId],
    (err, result) => {
      if (err) {
        console.error("Error updating task status:", err);
        return res.status(500).json({ error: "Failed to update task status." });
      }
      res.json({ message: "Task status updated successfully!" });
    }
  );
});









// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
