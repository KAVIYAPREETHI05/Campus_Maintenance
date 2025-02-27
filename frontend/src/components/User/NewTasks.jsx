import React, { useEffect, useState } from "react";
import "../../css/TaskPage.css";

const NewTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:5000/api/user/new-tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  const startTask = (taskId) => {
    fetch(`http://localhost:5000/api/user/start-task/${taskId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchTasks(); // Refresh the list after moving the task
      })
      .catch((err) => console.error("Error starting task:", err));
  };

  return (
    <div className="task-page">
      <h2>New Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Description</th>
            <th>No. of Workers</th>
            <th>Workers</th>
            <th>Estimated Time</th>
            <th>Location</th>
            <th>Action</th>
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
                <td>
                  <button onClick={() => startTask(task.id)}>Start</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No new tasks assigned.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewTasks;
