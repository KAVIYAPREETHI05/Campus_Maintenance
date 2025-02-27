import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTasks, FaUserPlus, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../../src/css/SideBar.css"; // Import CSS for sidebar

const Sidebar = ({ role }) => {
  // Load sidebar state from localStorage or set default to true
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("sidebarOpen") === "false" ? false : true;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  // Define sidebar links based on role
  const adminLinks = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <FaUsers /> },
    { path: "/admin/add-worker", name: "Add Worker", icon: <FaUserPlus /> },
    { path: "/admin/worker-management", name: "Worker Management", icon: <FaUsers /> },
    { path: "/admin/assign-task", name: "Task Assign", icon: <FaTasks /> },
    { path: "/admin/task-status", name: "Task Status", icon: <FaChartBar /> },
  ];

  const userLinks = [
    { path: "/user/dashboard", name: "Dashboard", icon: <FaUsers /> },
    { path: "/user/new-tasks", name: "New Tasks", icon: <FaTasks /> },
    { path: "/user/ongoing-tasks", name: "Ongoing Tasks", icon: <FaChartBar /> },
    { path: "/user/completed-tasks", name: "Completed Tasks", icon: <FaTasks /> },
    { path: "/user/contact", name: "Contact", icon: <FaCog /> },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className="menu">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path} className="nav-link">
              {link.icon} <span className="link-text">{isOpen && link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="logout">
        <NavLink to="/logout" className="nav-link">
          <FaSignOutAlt /> <span className="link-text">{isOpen && "Logout"}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
