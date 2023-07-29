import React, { useState, useEffect } from "react";
import IngerdientCard from "../IngerdientCard/IngerdientCard";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import { IoClose } from "react-icons/io5";
import Alert from "@mui/material/Alert";
import { BASE_URL_1 } from "../../../context/ApiContext";
import AlertTitle from "@mui/material/AlertTitle";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import { IconButton } from "@mui/material";
import "./ChildInfo.css";
import Spacer from "../Spacer";

const ChildInfo = ({ handleCloseChildInfo, child, makePurchase }) => {
  const { cartItems, productsTotal } = useCartItemsContext();

  const [noneAllergicProducts, setNoneAllergicProducts] = useState([]);
  const [items, setItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    setNoneAllergicProducts(
      Object.values(cartItems).filter((item) => {
        const isAllergic = item.allergicIngredients.some((item) =>
          child.allergies.includes(item)
        );
        return !isAllergic;
      })
    );

    setItems(
      Object.values(cartItems).map((item) => {
        const isAllergic = item.allergicIngredients.some((item) =>
          child.allergies.includes(item)
        );
        return { ...item, isAllergic };
      })
    );
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(parseFloat(productsTotal(noneAllergicProducts).toFixed(2)));
  }, [noneAllergicProducts]);

  return (
    <div className="child-info-container">
      <IconButton
        onClick={() => handleCloseChildInfo(false)}
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
        }}
      >
        <IoClose size={25} color="#00000070" />
      </IconButton>
      <div className="rows">
        <div className="child-info-col1">
          <div className="child-col1-row1">
            <img
              alt="child"
              src={
                child.image
                  ? BASE_URL_1 + `imgs/${child.image}`
                  : require("../../../assets/icons/help.png")
              }
            />
            <div>
              <h4>{child.firstName + " " + child.lastName}</h4>
              <p>
                Balance: <span>{parseFloat(child.credits.toFixed(2))}</span>
              </p>
            </div>
          </div>
          <div className="child-col1-row2">
            <h5>Allergies</h5>
            <div className="child-allergies">
              {child.allergies.map((allergy) => {
                return <IngerdientCard key={allergy} text={allergy} />;
              })}
            </div>
          </div>
        </div>

        <Spacer space={36} />

        <div className="child-order-col2">
          <div className="child-alert-container">
            <Alert severity={"warning"}>
              <AlertTitle>Warning</AlertTitle>
              {`This products may have ingredients that are allergic to ${child.firstName},`}
              <br />
              {"they will not receive a charge or be given."}
            </Alert>
          </div>

          <div className="child-order-container">
            {items.map((item) => (
              <OrderItemCard
                key={item.id}
                product={item}
                cardImg={item.image}
                text={item.title}
                amount={item.amount}
                total={item.amount * item.price}
                isAllergic={item.isAllergic}
              />
            ))}
          </div>
        </div>
      </div>

      {child.credits < totalPrice && (
        <p className="noselect">No suffecint balance</p>
      )}

      {child.credits >= totalPrice && totalPrice != null && totalPrice > 0 && (
        <div className="child-info-btn-container">
          <button
            className="confirm-btn"
            onClick={() => makePurchase(noneAllergicProducts)}
          >
            Charge {totalPrice} P
          </button>
        </div>
      )}
    </div>
  );
};

export default ChildInfo;
