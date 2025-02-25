import React, { useState } from "react";
import "../../css/AssignTask.css";

const AssignTask = () => {
  const [task, setTask] = useState({
    description: "",
    natureOfWork: "",
    numberOfWorkers: 1,
    workers: [""],
    estimatedTime: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Task assigned: ${task.description}`);
    setTask({ description: "", natureOfWork: "", numberOfWorkers: 1, workers: [""], estimatedTime: "" });
  };

  return (
    <div className="admin-page">
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit} className="task-form">

        {/* Task Description */}
        <input type="text" name="description" placeholder="Task Description" value={task.description} onChange={handleChange} required />

        {/* Nature of Work Dropdown */}
        <select name="natureOfWork" value={task.natureOfWork} onChange={handleChange} required>
          <option value="">Select Nature of Work</option>
          <option value="Plumber">Plumber</option>
          <option value="Technician">Technician</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Designer">Designer</option>
        </select>

        {/* Number of Workers Dropdown */}
        <select name="numberOfWorkers" value={task.numberOfWorkers} onChange={handleNumberOfWorkersChange} required>
          {[...Array(5).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1} Worker{num > 0 ? "s" : ""}
            </option>
          ))}
        </select>

        {/* Worker Name Inputs */}
        {task.workers.map((worker, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Worker ${index + 1} Name`}
            value={worker}
            onChange={(e) => handleWorkerChange(index, e)}
            required
          />
        ))}

        {/* Estimated Time */}
        <input type="text" name="estimatedTime" placeholder="Estimated Time (hours)" value={task.estimatedTime} onChange={handleChange} required />

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTask;
