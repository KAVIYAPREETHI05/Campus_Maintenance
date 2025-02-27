import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/UserDashboard.css";

const UserDashboard = () => {
  const [taskCounts, setTaskCounts] = useState({
    newTasks: 0,
    ongoingTasks: 0,
    completedTasks: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/user");
      const allTasks = response.data;

      // Counting tasks based on status
      const newTasks = allTasks.filter(task => task.status === "New").length;
      const ongoingTasks = allTasks.filter(task => task.status === "Ongoing").length;
      const completedTasks = allTasks.filter(task => task.status === "Completed").length;

      setTaskCounts({ newTasks, ongoingTasks, completedTasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Worker Task Dashboard</h2>

      <div className="task-summary">
        <div className="task-card new">
          <h3>🆕 New Tasks</h3>
          <p>{taskCounts.newTasks}</p>
        </div>

        <div className="task-card ongoing">
          <h3>🚀 Ongoing Tasks</h3>
          <p>{taskCounts.ongoingTasks}</p>
        </div>

        <div className="task-card completed">
          <h3>✅ Completed Tasks</h3>
          <p>{taskCounts.completedTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
