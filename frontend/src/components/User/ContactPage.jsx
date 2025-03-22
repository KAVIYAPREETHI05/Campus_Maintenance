import React, { useEffect, useState } from "react";
import "../../css/ContactPage.css";

const ContactPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [coworkers, setCoworkers] = useState([]);

  // Fetch all tasks on page load
  useEffect(() => {
    fetch("http://localhost:5000/api/user/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Handle Task ID selection
  const handleTaskChange = (e) => {
    const taskId = e.target.value;
    setSelectedTask(taskId);

    if (taskId) {
      // Fetch workers assigned to the selected Task ID
      fetch(`http://localhost:5000/api/user/coworkers/${taskId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((workers) => {
          setCoworkers(workers);
        })
        .catch((err) => console.error("Error fetching coworkers:", err));
    } else {
      setCoworkers([]);
    }
  };

  return (
    <div className="task-page">
      <h2>Contact Coworkers</h2>
      
      {/* Task Selection Dropdown (Using Task ID) */}
      <div className="input-group">
        <label>Select Task ID:</label>
        <select value={selectedTask} onChange={handleTaskChange}>
          <option value="">Select a Task ID</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.id}  {/* Display Task ID */}
            </option>
          ))}
        </select>
      </div>

      {/* Worker Details Table */}
      <table>
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Mobile</th>
            <th>Call</th>
          </tr>
        </thead>
        <tbody>
          {coworkers.length > 0 ? (
            coworkers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.mobile}</td>
                <td>
                  <button
                    className="call-btn"
                    onClick={() => window.location.href = `tel:${worker.mobile}`}
                  >
                    Call
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No coworkers assigned for this task.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactPage;
