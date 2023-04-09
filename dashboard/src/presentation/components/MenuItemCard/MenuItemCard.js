import React from "react";
import "./MenuItemCard.css";
import { BASE_URL } from "../../../context/ApiContext";
const MenuItemCard = ({ cardImg, text, price }) => {
  // image
  return (
    <div className="menuItemCard-container">
      <img
        src={
          cardImg
            ? BASE_URL + `imgs/${cardImg}`
            : require("../../../assets/icons/file.png")
        }
        alt="menu-item"
      />
      <h4>{text}</h4>
      <span>{price}</span>
    </div>
  );
};

export default MenuItemCard;
