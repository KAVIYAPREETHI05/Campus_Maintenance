import React, { useState, useEffect } from "react";
import { FaUsers, FaTasks, FaChartPie } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../SideBar";
import "../../css/AdminDashboard.css"; // Import CSS for styling

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalWorkers: 0,
    totalTasks: 0,
    totalWorks: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/dashboard");
      setDashboardStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Component with Explicit Role */}
      <Sidebar role="admin" />

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        <div className="dashboard-stats">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div>
              <h3>Total Workers</h3>
              <p>{dashboardStats.totalWorkers}</p>
            </div>
          </div>

          <div className="stat-card">
            <FaTasks className="stat-icon" />
            <div>
              <h3>Total Tasks</h3>
              <p>{dashboardStats.totalTasks}</p>
            </div>
          </div>

          <div className="stat-card">
            <FaChartPie className="stat-icon" />
            <div>
              <h3>Total Works</h3>
              <p>{dashboardStats.totalWorks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
