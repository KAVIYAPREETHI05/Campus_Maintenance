import React from "react";
import { FaUsers, FaTasks, FaChartPie } from "react-icons/fa";
import Sidebar from "../SideBar";
import "../../css/AdminDashboard.css"; // Import CSS for styling

const AdminDashboard = () => {
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
              <p>120</p>
            </div>
          </div>

          <div className="stat-card">
            <FaTasks className="stat-icon" />
            <div>
              <h3>Total Tasks</h3>
              <p>450</p>
            </div>
          </div>

          <div className="stat-card">
            <FaChartPie className="stat-icon" />
            <div>
              <h3>Total Works</h3>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
