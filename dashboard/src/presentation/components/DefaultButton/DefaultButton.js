import React from "react";

import "./DefaultButton.css";

const DefualtButton = ({ text, onClick, icon, styles }) => {
  return (
    <button className="defualt-btn" onClick={onClick} style={{ ...styles }}>
      {text}
      {icon}
    </button>
  );
};

export default DefualtButton;
