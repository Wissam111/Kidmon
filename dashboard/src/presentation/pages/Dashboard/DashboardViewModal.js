import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const DashboardViewModal = () => {
  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:4000", { transports: ["websocket"] });
    socket.on("dashboard", (data) => {
      // console.log(data);
      setDashboardStats(data);
    });
    return () => {
      socket.close();
    };
  }, []);
  return {
    dashboardStats,
  };
};

export default DashboardViewModal;
