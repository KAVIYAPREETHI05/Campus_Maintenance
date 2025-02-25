import './App.css'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AddWorker from "./components/Admin/AddWorker";
import WorkerManagement from "./components/Admin/WorkerManagement";
import AssignTask from "./components/Admin/AssignTask";
import TaskStatus from "./components/Admin/TaskStatus";
import Reports from "./components/Admin/Reports";
import Settings from "./components/Admin/Settings";
import "./css/AdminPages.css";

const App = () => {
  return (
    <Router>
      <Sidebar role="admin" />
      <Routes>
      {console.log("Current Path:", window.location.pathname)}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-worker" element={<AddWorker />} />
        <Route path="/worker-management" element={<WorkerManagement />} />
        <Route path="/assign-task" element={<AssignTask />} />
        <Route path="/task-status" element={<TaskStatus />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
