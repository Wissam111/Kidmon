import React from "react";
import "./OrderItemCard.css";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BASE_URL_1 } from "../../../context/ApiContext";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
const OrderItemCard = ({ product, cardImg, total, amount, text }) => {
  const { dispatch } = useCartItemsContext();

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVEFROMCART", payload: product });
  };
  return (
    <div className="orderItem-card-container">
      <img
        src={
          cardImg
            ? BASE_URL_1 + `imgs/${cardImg}`
            : require("../../../assets/icons/help.png")
        }
        alt="order-item"
      />
      <span className="text-order">{text}</span>
      <span className="amount-order">x{amount}</span>
      <span className="total-order">{total} P</span>
      <AiOutlineMinusCircle
        cursor={"pointer"}
        color="gray"
        onClick={handleRemoveFromCart}
      />
    </div>
  );
};

export default OrderItemCard;
