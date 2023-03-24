import React from "react";
import "./OrderItemCard.css";

const OrderItemCard = ({ cardImg, total, amount, text }) => {
  return (
    <div className="orderItem-card-container">
      <img src={cardImg} alt="order-item" />
      <span className="text-order">{text}</span>
      <span className="amount-order">x{amount}</span>
      <span className="total-order">{total} P</span>
    </div>
  );
};

export default OrderItemCard;
