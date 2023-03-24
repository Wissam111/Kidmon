import React from "react";
import "./CartMenu.css";
import OrderItemCard from "../OrderItemCard/OrderItemCard";

const CartMenu = () => {
  return (
    <div className="cart-menu-container">
      <h3>
        Order <span>Menu</span>
      </h3>
      <div className="orders-wrapper">
        <OrderItemCard
          cardImg={require("../../../assets/imgs/dor1.jpg")}
          text="Green Doritos"
          amount={2}
          total={11.99}
        />
        <OrderItemCard
          cardImg={require("../../../assets/imgs/dor1.jpg")}
          text="Green Doritos"
          amount={2}
          total={11.99}
        />
        <OrderItemCard
          cardImg={require("../../../assets/imgs/dor1.jpg")}
          text="Green Doritos"
          amount={2}
          total={11.99}
        />
      </div>
      <button>Charge 30.97 P</button>
    </div>
  );
};

export default CartMenu;
