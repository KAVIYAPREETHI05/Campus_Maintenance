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

// Add a worker
app.post("/api/workers", (req, res) => {
  const { name, natureOfWork, email, password, experience, mobile } = req.body;
  db.query(
    "INSERT INTO workers (name, natureOfWork, email, password, experience, mobile) VALUES (?, ?, ?, ?, ?, ?)",
    [name, natureOfWork, email, password, experience, mobile],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding worker");
      } else {
        res.status(201).send("Worker added successfully");
      }
    }
  );
});



// Update worker details
app.put("/api/workers/:id", (req, res) => {
  const { name, natureOfWork, email, experience, mobile } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE workers SET name=?, natureOfWork=?, email=?, experience=?, mobile=? WHERE id=?",
    [name, natureOfWork, email, experience, mobile, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating worker");
      } else {
        res.send("Worker updated successfully");
      }
    }
  );
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


//----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//user side

// 🟢 API to fetch all new tasks (status = pending)
app.get("/api/user/new-tasks", (req, res) => {
  const query = "SELECT * FROM newtask"; // Fetch all new tasks

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching new tasks:", err);
      res.status(500).json({ error: "Failed to fetch tasks" });
    } else {
      res.json(results);
    }
  });
});

// API to move a task from "New Tasks" to "Ongoing Tasks"
app.put("/api/user/start-task/:id", (req, res) => {
  const taskId = req.params.id;

  // Step 1: Update the task status in the "tasks" table
  const updateQuery = "UPDATE tasks SET status = 'ongoing' WHERE id = ?";
  
  db.query(updateQuery, [taskId], (err, result) => {
    if (err) {
      console.error("Error updating task status:", err);
      return res.status(500).json({ error: "Failed to update task status" });
    }

    // Step 2: Remove the task from the "newtask" table
    const deleteQuery = "DELETE FROM newtask WHERE id = ?";
    
    db.query(deleteQuery, [taskId], (err, deleteResult) => {
      if (err) {
        console.error("Error deleting task from newtask table:", err);
        return res.status(500).json({ error: "Failed to delete task" });
      }

      res.json({ message: "Task moved to ongoing successfully!" });
    });
  });
});


// API to get all ongoing tasks
app.get("/api/user/ongoing-tasks", (req, res) => {
  const query = "SELECT * FROM tasks WHERE status = 'ongoing'";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching ongoing tasks:", err);
      res.status(500).json({ error: "Failed to fetch tasks" });
    } else {
      res.json(results);
    }
  });
});


app.put("/api/user/complete-task/:id", (req, res) => {
  const taskId = req.params.id;

  // Step 1: Move task from "ongoing" to "completed"
  const updateQuery = "UPDATE tasks SET status = 'completed' WHERE id = ?";

  db.query(updateQuery, [taskId], (err, result) => {
    if (err) {
      console.error("Error updating task status:", err);
      return res.status(500).json({ error: "Failed to complete task" });
    }

    // Step 2: Fetch updated task details
    const fetchQuery = "SELECT * FROM tasks WHERE id = ?";
    db.query(fetchQuery, [taskId], (err, taskResult) => {
      if (err) {
        console.error("Error fetching completed task:", err);
        return res.status(500).json({ error: "Failed to fetch task" });
      }

      res.json({ message: "Task moved to completed!", completedTask: taskResult[0] });
    });
  });
});

app.get("/api/user/completed-tasks", (req, res) => {
  const completedQuery = "SELECT * FROM tasks WHERE status = 'completed'";

  db.query(completedQuery, (err, results) => {
    if (err) {
      console.error("Error fetching completed tasks:", err);
      return res.status(500).json({ error: "Failed to fetch completed tasks" });
    }
    res.json(results);
  });
});







// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
