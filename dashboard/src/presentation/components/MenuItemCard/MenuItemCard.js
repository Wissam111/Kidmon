import React, { useCallback } from "react";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";

import "./MenuItemCard.css";
import { BASE_URL_1 } from "../../../context/ApiContext";

const MenuItemCard = ({ product }) => {
  const { dispatch } = useCartItemsContext();

  const handleAddtoCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };
  return (
    <div className="menuItemCard-container" onClick={handleAddtoCart}>
      <img
        src={
          product.image
            ? BASE_URL_1 + `imgs/${product.image}`
            : require("../../../assets/icons/help.png")
        }
        alt="menu-item"
      />
      <h4>{product.title}</h4>
      <span>{product.price} P</span>
    </div>
  );
};

export default MenuItemCard;
