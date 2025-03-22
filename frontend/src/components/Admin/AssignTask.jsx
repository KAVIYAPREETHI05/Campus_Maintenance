import React, { useState } from "react";
import axios from "axios";
import "../../css/AssignTask.css";

const AssignTask = () => {
  const [task, setTask] = useState({
    description: "",
    natureOfWork: "",
    numberOfWorkers: 1,
    workers: [""],
    estimatedHours: "",
    estimatedMinutes: "",
    location: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleWorkerChange = (index, e) => {
    const newWorkers = [...task.workers];
    newWorkers[index] = e.target.value;
    setTask({ ...task, workers: newWorkers });
  };

  const handleNumberOfWorkersChange = (e) => {
    const numWorkers = parseInt(e.target.value, 10);
    setTask({
      ...task,
      numberOfWorkers: numWorkers,
      workers: Array(numWorkers).fill(""),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/assign-task", task);
      alert("Task assigned successfully!");
      setTask({ description: "", natureOfWork: "", workers: [], estimatedHours: "", estimatedMinutes: "", location: "" });
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task.");
    }
  };

  return (
    <div className="task-container">
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <input type="text" name="description" placeholder="Task Description" value={task.description} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <select name="natureOfWork" value={task.natureOfWork} onChange={handleChange} required>
            <option value="">Select Nature of Work</option>
            <option value="Plumber">Plumber</option>
            <option value="Technician">Technician</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        <div className="input-group">
          <select name="numberOfWorkers" value={task.numberOfWorkers} onChange={handleNumberOfWorkersChange} required>
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Worker{num > 0 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {task.workers.map((worker, index) => (
          <div key={index} className="input-group">
            <input type="text" placeholder={`Worker ${index + 1} Name`} value={worker} onChange={(e) => handleWorkerChange(index, e)} required />
          </div>
        ))}

        <div className="estimated-time-container">
          <select name="estimatedHours" value={task.estimatedHours} onChange={handleChange} required>
            <option value="">Hours</option>
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>{hour} hr</option>
            ))}
          </select>

          <select name="estimatedMinutes" value={task.estimatedMinutes} onChange={handleChange} required>
            <option value="">Minutes</option>
            {[0, 15, 30, 45].map((min) => (
              <option key={min} value={min}>{min} min</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <input type="text" name="location" placeholder="Task Location" value={task.location} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTask;
