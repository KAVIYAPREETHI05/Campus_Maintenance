import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/WorkerManagement.css";

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([]);
  const [editWorker, setEditWorker] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    natureOfWork: "",
    email: "",
    experience: "",
    mobile: "",
  });

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

  const handleEdit = (worker) => {
    setEditWorker(worker);
    setFormData(worker);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/workers/${editWorker.id}`, formData);
      setEditWorker(null);
      fetchWorkers();
    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  return (
    <div className="worker-management-container">
      <h2>Worker Management</h2>

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
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.name}</td>
                <td>{worker.natureOfWork}</td>
                <td>{worker.email}</td>
                <td>{worker.experience} years</td>
                <td>{worker.mobile}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(worker)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(worker.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editWorker && (
        <div className="edit-modal">
          <h3>Edit Worker</h3>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <input type="text" name="natureOfWork" value={formData.natureOfWork} onChange={handleChange} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditWorker(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default WorkerManagement;
