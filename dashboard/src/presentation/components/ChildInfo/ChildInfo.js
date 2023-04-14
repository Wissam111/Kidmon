import React, { useState, useEffect } from "react";
import IngerdientCard from "../IngerdientCard/IngerdientCard";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import { IoClose } from "react-icons/io5";
import Alert from "@mui/material/Alert";
import { BASE_URL_1 } from "../../../context/ApiContext";
import AlertTitle from "@mui/material/AlertTitle";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import "./ChildInfo.css";

const ChildInfo = ({ handleCloseChildInfo, child, makePurchase }) => {
  const { cartItems, productsTotal } = useCartItemsContext();

  const [allegicProducts, setAllegicProducts] = useState({});
  const [noneAllegicProducts, setNoneAllegicProducts] = useState([]);

  useEffect(() => {
    const allrgic = [];
    const noneAllergic = [];
    cartItems.forEach((product) => {
      const isAllergy = product.allergicIngredients.some((item) =>
        child.allergies.includes(item)
      );
      if (isAllergy) {
        allrgic.push(product);
      } else {
        noneAllergic.push(product);
      }
    });
    var results1 = allrgic.reduce(function (results, item) {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setAllegicProducts(results1);
    setNoneAllegicProducts(noneAllergic);
  }, []);
  return (
    <div className="child-info-container">
      <IoClose
        size={25}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          margin: 10,
          cursor: "pointer",
        }}
        onClick={handleCloseChildInfo}
        color="#00000070"
      />
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
              Balance <span>{child.credits}</span>
            </p>
          </div>
        </div>
        <div className="child-col1-row2">
          <h5>Allergies</h5>
          <div className="child-allergies">
            {child.allergies.map((allergy) => {
              return <IngerdientCard text={allergy} />;
            })}
          </div>
        </div>
      </div>
      <div className="child-order-col2">
        <div className="child-alert-container">
          <Alert severity={"warning"}>
            <AlertTitle>Warning</AlertTitle>
            {`This products has ingredients that are allergic to ${child.firstName},`}
            <br />
            {"they will not receive a charge or be given."}
          </Alert>
        </div>
        <div className="child-order-container">
          {Object.entries(allegicProducts).map(([key, items]) => (
            <OrderItemCard
              product={items[0]}
              cardImg={items[0].image}
              text={items[0].title}
              amount={items.length}
              total={items.length * items[0].price}
              isAllergic={true}
            />
          ))}
        </div>
      </div>
      <button
        className="confirm-btn"
        onClick={() => makePurchase(noneAllegicProducts)}
      >
        Charge {productsTotal(noneAllegicProducts)} P
      </button>
    </div>
  );
};

export default ChildInfo;
