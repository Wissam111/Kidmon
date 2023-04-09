import React from "react";

import "./IngerdientCard.css";
const IngerdientCard = ({ text, handleSelectInerdient, isActive }) => {
  return (
    <div
      className={`ingerdient-card-wrapper ${
        isActive ? "active-ingerdient" : ""
      }`}
      onClick={handleSelectInerdient}
    >
      <span>{text}</span>
      <img src={require("../../../assets/icons/allerg.png")} />
    </div>
  );
};

export default IngerdientCard;
