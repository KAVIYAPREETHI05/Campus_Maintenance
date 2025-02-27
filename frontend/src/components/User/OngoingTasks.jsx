import React, { useEffect, useState } from "react";
import "../../css/TaskPage.css";

const OngoingTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/ongoing-tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching ongoing tasks:", err));
  }, []);

  // Function to mark a task as completed
  const handleCompleteTask = (taskId) => {
    fetch(`http://localhost:5000/api/user/complete-task/${taskId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message); // Show success message
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Ensure proper state update
      })
      .catch((err) => console.error("Error completing task:", err));
  };

  return (
    <div className="task-page">
      <h2>Ongoing Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Description</th>
            <th>No. of Workers</th>
            <th>Workers</th>
            <th>Estimated Time</th>
            <th>Location</th>
            <th>Action</th> {/* New Column for the Complete Button */}
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
                <td>
                  {task.estimatedHours}h {task.estimatedMinutes}m
                </td>
                <td>{task.location}</td>
                <td>
                  <button 
                    className="complete-btn" 
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No ongoing tasks.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingTasks;
