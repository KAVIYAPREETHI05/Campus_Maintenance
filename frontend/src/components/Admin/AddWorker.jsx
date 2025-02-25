import React, { useState } from "react";
import axios from "axios"; // Import axios
import { FaUser, FaBriefcase, FaEnvelope, FaLock, FaClock, FaPhone } from "react-icons/fa";
import "../../css/AddWorker.css";

const AddWorker = () => {
  const [worker, setWorker] = useState({
    name: "",
    natureOfWork: "",
    email: "",
    password: "",
    experience: "",
    mobile: "",
  });

  const [message, setMessage] = useState(""); // Success/Error message

  const handleChange = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send worker data to backend
      const res = await axios.post("http://localhost:5000/api/workers", worker);

      if (res.status === 201) {
        setMessage("✅ Worker added successfully!");
        setWorker({ name: "", natureOfWork: "", email: "", password: "", experience: "", mobile: "" });
      } else {
        setMessage("⚠️ Failed to add worker.");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
      setMessage("❌ Error adding worker. Please try again.");
    }
  };

  return (
    <div className="worker-container">
      <h2>Add Worker</h2>
      {message && <p className="message">{message}</p>} {/* Display success/error message */}

      <form onSubmit={handleSubmit} className="worker-form">
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" name="name" placeholder="Worker Name" value={worker.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaBriefcase className="icon" />
          <select name="natureOfWork" value={worker.natureOfWork} onChange={handleChange} required>
            <option value="">Select Nature of Work</option>
            <option value="Plumber">Plumber</option>
            <option value="Technician">Technician</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Designer">Designer</option>
          </select>
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" name="email" placeholder="Email" value={worker.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" name="password" placeholder="Password" value={worker.password} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaClock className="icon" />
          <input type="number" name="experience" placeholder="Experience (Years)" value={worker.experience} onChange={handleChange} min="0" required />
        </div>

        <div className="input-group">
          <FaPhone className="icon" />
          <input type="tel" name="mobile" placeholder="Mobile Number" value={worker.mobile} onChange={handleChange} pattern="[0-9]{10}" title="Enter a valid 10-digit mobile number" required />
        </div>

        <button type="submit">Add Worker</button>
      </form>
    </div>
  );
};

export default AddWorker;
