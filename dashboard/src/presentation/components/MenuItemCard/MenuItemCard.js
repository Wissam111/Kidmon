import React from "react";
import "./MenuItemCard.css";

const MenuItemCard = ({ cardImg, text, price }) => {
  return (
    <div className="menuItemCard-container">
      <img src={cardImg} alt="menu-item" />
      <h4>{text}</h4>
      <span>{price}</span>
    </div>
  );
};

export default MenuItemCard;
