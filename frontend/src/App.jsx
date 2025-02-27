import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/SideBar";

// Admin Pages
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddWorker from "./components/Admin/AddWorker";
import WorkerManagement from "./components/Admin/WorkerManagement";
import AssignTask from "./components/Admin/AssignTask";
import TaskStatus from "./components/Admin/TaskStatus";
import Reports from "./components/Admin/Reports";
import Settings from "./components/Admin/Settings";

// User Pages
import UserDashboard from "./components/User/UserDashboard";
import NewTasks from "./components/User/NewTasks";
import OngoingTasks from "./components/User/OngoingTasks";
import CompletedTasks from "./components/User/CompletedTasks";
import ContactPage from "./components/User/ContactPage";

import "./css/AdminPages.css";

const App = () => {
  // Get user role from localStorage (default to "user" if not found)
  const role = localStorage.getItem("role") || "user";

  return (
    <Router>
      <Routes>
        {/* Default Redirection Based on Role */}
        <Route path="/" element={<Navigate to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"} />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* User Routes */}
        <Route path="/user/*" element={<UserLayout />} />

        {/* Fallback Route for Invalid Paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// Admin Layout with Sidebar
const AdminLayout = () => (
  <>
    <Sidebar role="admin" />
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/add-worker" element={<AddWorker />} />
      <Route path="/worker-management" element={<WorkerManagement />} />
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/task-status" element={<TaskStatus />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </>
);

// User Layout with Sidebar
const UserLayout = () => (
  <>
    <Sidebar role="user" />
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/new-tasks" element={<NewTasks />} />
      <Route path="/ongoing-tasks" element={<OngoingTasks />} />
      <Route path="/completed-tasks" element={<CompletedTasks />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </>
);

export default App;
