import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/TaskStatus.css"; // Import separate CSS file

const TaskStatus = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handle status change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/update-task-status/${taskId}`, { status: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="task-status-container">
      <h2>Task Status</h2>
      <p>Monitor the progress of assigned tasks.</p>

      <table className="task-status-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Nature of Work</th>
            <th>Number of Workers</th>
            <th>Workers</th>
            <th>Estimated Time</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.natureOfWork}</td>
              <td>{task.numberOfWorkers}</td>
              <td>{task.workers.join(", ")}</td>
              <td>{`${task.estimatedHours} hr ${task.estimatedMinutes} min`}</td>
              <td>{task.location}</td>
              <td>
                <select
                  className="status-dropdown"
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="started">Started</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskStatus;
