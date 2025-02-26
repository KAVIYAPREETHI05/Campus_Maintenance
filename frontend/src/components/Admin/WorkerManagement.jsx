import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/WorkerManagement.css";  // Import the specific CSS file

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/workers");
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      try {
        await axios.delete(`http://localhost:5000/api/workers/${id}`);
        setWorkers(workers.filter((worker) => worker.id !== id));
      } catch (error) {
        console.error("Error deleting worker:", error);
      }
    }
  };

  return (
    <div className="worker-management-container">
      <h2>Worker Management</h2>
      <p>View, edit, or remove workers from the system.</p>

      {/* Wrap the table in a scrollable container */}
      <div className="worker-table-container">
        <table className="worker-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nature of Work</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.length > 0 ? (
              workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.natureOfWork}</td>
                  <td>{worker.email}</td>
                  <td>{worker.experience} years</td>
                  <td>{worker.mobile}</td>
                  <td className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(worker.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No workers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerManagement;
