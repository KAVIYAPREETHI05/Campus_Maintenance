import React, { useEffect, useState } from "react";
import "../../css/TaskPage.css";

const ContactPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [coworkers, setCoworkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/tasks") // Replace with actual backend API
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleTaskChange = (e) => {
    const taskId = e.target.value;
    setSelectedTask(taskId);

    if (taskId) {
      fetch(`http://localhost:5000/api/user/coworkers/${taskId}`)
        .then((res) => res.json())
        .then((data) => setCoworkers(data))
        .catch((err) => console.error("Error fetching coworkers:", err));
    } else {
      setCoworkers([]);
    }
  };

  return (
    <div className="task-page">
      <h2>Contact Coworkers</h2>
      <div className="input-group">
        <label>Select Task:</label>
        <select value={selectedTask} onChange={handleTaskChange}>
          <option value="">Select a task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.description}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {coworkers.length > 0 ? (
            coworkers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>
                  <a href={`tel:${worker.mobile}`}>{worker.mobile}</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No coworkers assigned for this task.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactPage;
