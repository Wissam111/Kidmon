import { useCallback, useEffect, useState } from "react";
import "./CartMenu.css";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import { IoAdd } from "react-icons/io5";
import Fade from "../Fade/Fade";

const CartMenu = ({ handleShowScan }) => {
  const { cartItems, dispatch } = useCartItemsContext();
  const [groupedItems, setGroupedItems] = useState({});
  useEffect(() => {
    var results = cartItems.reduce(function (results, item) {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItems(results);
  }, [cartItems]);

  const clear = useCallback(() => {
    dispatch({ type: "DELETECART" });
  })

  return (
    <div className="cart-menu-container">
      <h3>
        Order <span>Menu</span>
      </h3>
      {cartItems.length > 0 &&
        <IoAdd className="clear" size={28} onClick={clear}>Clear</IoAdd>
      }
      <div className="orders-wrapper">
        {Object.entries(groupedItems).map(([key, items] , index) => (
          <OrderItemCard
            key={items[0].id}
            product={items[0]}
            cardImg={items[0].image}
            text={items[0].title}
            amount={items.length}
            total={items.length * items[0].price}
            index={index}
          />
        ))}
      </div>

      <div className="space"></div>

      {/* {cartItems.length > 0 && ( */}
      <Fade isVisible={cartItems.length > 0}>
        <button className="confirm-btn" onClick={handleShowScan}>
          Scan
        </button>
      </Fade>

      {/* )} */}
    </div>
  );
};

export default CartMenu;
