import React, { useState } from "react";
import "./OrderItemCard.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL_1 } from "../../../context/ApiContext";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useCallback } from "react";


const OrderItemCard = ({
  product,
  cardImg,
  total,
  amount,
  text,
  isAllergic,
}) => {
  const { dispatch } = useCartItemsContext();
  const [showAllergyInfo, setShowAllergyInfo] = useState(false);

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const onAmountChange = useCallback((value) => {
    dispatch({
      type: 'UPDATE_AMOUNT', payload: {
        id: product.id,
        amount: value
      }
    })
  }, [dispatch])

  return (
    <div className="outter">
      <div
        className={`orderItem-card-container ${isAllergic ? "orderItem-allergic" : ""
          }`}
        onMouseEnter={() => setShowAllergyInfo(true)}
        onMouseLeave={() => setShowAllergyInfo(false)}>

        {showAllergyInfo && isAllergic && (
          <div className="order-alert-container">
            <Alert severity={"info"}>
              <AlertTitle>Info</AlertTitle>
              {`This product have ${product.allergicIngredients} that allergic to this child`}
            </Alert>
          </div>
        )}

        <img
          className="noselect"
          src={
            cardImg
              ? BASE_URL_1 + `imgs/${cardImg}`
              : require("../../../assets/icons/help.png")
          }
          alt="order-item"
        />
        <span className="text-order noselect">{text}</span>
        <span className="amount-order noselect">x{amount}</span>
        <span className="total-order noselect">{parseFloat(total.toFixed(2))} P</span>
        <AiOutlineDelete
          style={{ zIndex: 10 }}
          cursor={"pointer"}
          color="gray"
          onClick={handleRemoveFromCart}
        />

      </div>
      <QuantitySelector min={0} value={amount} onChange={onAmountChange} />
    </div>
  );
};

export default OrderItemCard;
