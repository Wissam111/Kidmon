import { useEffect } from "react";
import { io } from "socket.io-client";

const DashboardViewModal = () => {
  useEffect(() => {
    const socket = io("http://localhost:4000", { transports: ["websocket"] });
    socket.on("dashboard", (data) => {
      console.log(data);
    });
    return () => {
      socket.close();
    };
  }, []);
  return {};
};

export default DashboardViewModal;
