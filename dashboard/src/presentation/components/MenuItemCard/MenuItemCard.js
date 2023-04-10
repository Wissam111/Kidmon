import React from "react";
import "./MenuItemCard.css";
import { BASE_URL_1 } from "../../../context/ApiContext";
const MenuItemCard = ({ cardImg, text, price }) => {
  // image
  return (
    <div className="menuItemCard-container">
      <img
        src={
          cardImg
            ? BASE_URL_1 + `imgs/${cardImg}`
            : require("../../../assets/icons/file.png")
        }
        alt="menu-item"
      />
      <h4>{text}</h4>
      <span>{price} P</span>
    </div>
  );
};

export default MenuItemCard;
