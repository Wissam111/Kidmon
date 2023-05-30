import "./DashboardHeader.css";
import { FaCalendarAlt } from "react-icons/fa";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Clock from "react-clock";
// import "react-clock/dist/Clock.css";
function DashboardHeader({ firstName }) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="dashboard-main-bar-container">
      <div className="board-info">
        <h3>Hello {firstName} !</h3>
        <span>here is a centralized hub for kidmon data and information</span>
      </div>

      <div className="board-date">
        <span>{moment().format("dddd") + ", " + moment().format("ll")}</span>
        <FaCalendarAlt />
      </div>
      <img src={require("../../../assets/imgs/userimg.jpg")} />
    </div>
  );
}

export default DashboardHeader;
