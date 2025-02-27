import React, { useEffect, useState } from "react";
import "../../css/TaskPage.css";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/completed-tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching completed tasks:", err));
  }, []);

  return (
    <div className="task-page">
      <h2>Completed Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Description</th>
            <th>No. of Workers</th>
            <th>Workers</th>
            <th>Estimated Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{task.numberOfWorkers}</td>
                <td>{task.workers}</td>
                <td>{task.estimatedHours}h {task.estimatedMinutes}m</td>
                <td>{task.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No completed tasks.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedTasks;
