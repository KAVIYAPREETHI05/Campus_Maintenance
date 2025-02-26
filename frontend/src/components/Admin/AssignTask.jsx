import React, { useState } from "react";
import { FaTasks, FaUserCog, FaUsers, FaClock, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import "../../css/AssignTask.css";

const AssignTask = () => {
  const [task, setTask] = useState({
    description: "",
    natureOfWork: "",
    numberOfWorkers: 1,
    workers: [""],
    estimatedTime: "",
    location: "",  // Added location field
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
    setTask({ description: "", natureOfWork: "", numberOfWorkers: 1, workers: [""], estimatedTime: "", location: "" });
  };

  return (
    <div className="task-container">
      <h2>
        <FaTasks className="text-blue-600" /> Assign Task
      </h2>

      <form onSubmit={handleSubmit} className="task-form">
        {/* Task Description */}
        <div className="input-group">
          <FaTasks />
          <input type="text" name="description" placeholder="Task Description"
            value={task.description} onChange={handleChange} required />
        </div>

        {/* Nature of Work Dropdown */}
        <div className="input-group">
          <FaUserCog />
          <select name="natureOfWork" value={task.natureOfWork} onChange={handleChange} required>
            <option value="">Select Nature of Work</option>
            <option value="Plumber">Plumber</option>
            <option value="Technician">Technician</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        {/* Number of Workers Dropdown */}
        <div className="input-group">
          <FaUsers />
          <select name="numberOfWorkers" value={task.numberOfWorkers} onChange={handleNumberOfWorkersChange} required>
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Worker{num > 0 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Worker Name Inputs */}
        {task.workers.map((worker, index) => (
          <div key={index} className="input-group">
            <FaUserCog />
            <input type="text" placeholder={`Worker ${index + 1} Name`}
              value={worker} onChange={(e) => handleWorkerChange(index, e)} required />
          </div>
        ))}

        {/* Estimated Time */}
        <div className="estimated-time-container">
          <FaClock className="icon" />

          {/* Hours Dropdown */}
          <select name="estimatedHours" value={task.estimatedHours} onChange={handleChange} required>
            <option value="">Hours</option>
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>{hour} hr</option>
            ))}
          </select>

          {/* Minutes Dropdown */}
          <select name="estimatedMinutes" value={task.estimatedMinutes} onChange={handleChange} required>
            <option value="">Minutes</option>
            {[0, 15, 30, 45].map((min) => (
              <option key={min} value={min}>{min} min</option>
            ))}
          </select>
        </div>

        {/* Location Field (Newly Added) */}
        <div className="input-group">
          <FaMapMarkerAlt />
          <input type="text" name="location" placeholder="Task Location"
            value={task.location} onChange={handleChange} required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          <FaCheckCircle /> Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
