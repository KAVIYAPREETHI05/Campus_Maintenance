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
    fetchTaskCounts();
  }, []);

  const fetchTaskCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/user");
      setTaskCounts(response.data);
    } catch (error) {
      console.error("Error fetching task counts:", error);
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
