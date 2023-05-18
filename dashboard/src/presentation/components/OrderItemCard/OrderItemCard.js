import React, { useState } from "react";
import "./OrderItemCard.css";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BASE_URL_1 } from "../../../context/ApiContext";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const OrderItemCard = ({
  product,
  cardImg,
  total,
  amount,
  text,
  isAllergic,
  index
}) => {
  const { dispatch } = useCartItemsContext();
  const [showAllergyInfo, setShowAllergyInfo] = useState(false);
  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVEFROMCART", payload: product });
  };

  console.log(index);
  const colors = ['#96d3d9', '#a7e677', '#b396d9']

  return (
    <div
      style={{ border: `1px solid ${colors[index % colors.length]}` }}
      className={`orderItem-card-container ${isAllergic ? "orderItem-allergic" : ""
        }`}
      onMouseEnter={() => setShowAllergyInfo(true)}
      onMouseLeave={() => setShowAllergyInfo(false)}
    >
      {showAllergyInfo && isAllergic && (
        <div className="order-alert-container">
          <Alert severity={"info"}>
            <AlertTitle>Info</AlertTitle>
            {`This product hava ${product.allergicIngredients} that allergic to this child`}
          </Alert>
        </div>
      )}

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
      <span className="total-order">{parseFloat(total.toFixed(2))} P</span>
      <AiOutlineMinusCircle
        cursor={"pointer"}
        color="gray"
        onClick={handleRemoveFromCart}
      />
    </div>
  );
};

export default OrderItemCard;
