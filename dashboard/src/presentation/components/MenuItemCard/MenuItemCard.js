import React, { useCallback } from "react";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";

import "./MenuItemCard.css";
import { BASE_URL_1 } from "../../../context/ApiContext";
import Spacer from "../Spacer";

const MenuItemCard = ({ product }) => {
  const { dispatch } = useCartItemsContext();

  const handleAddtoCart = () => {
    console.log("add");
    dispatch({ type: "ADD_ITEM", payload: product });
  };
  return (
    <div className="menuItemCard-container" onClick={handleAddtoCart}>
      <img
        className="noselect"
        src={
          product.image
            ? BASE_URL_1 + `imgs/${product.image}`
            : require("../../../assets/icons/help.png")
        }
        alt="menu-item"
      />
      <Spacer space={4} />
      <h4 className="noselect">{product.title}</h4>
      <span className="noselect">{product.price} P</span>
    </div>
  );
};

export default MenuItemCard;
