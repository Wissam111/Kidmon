import { useEffect, useState } from "react";
import "./CartMenu.css";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import OrderItemCard from "../OrderItemCard/OrderItemCard";

const CartMenu = ({ handleShowScan }) => {
  const { cartItems } = useCartItemsContext();
  const [groupedItems, setGroupedItems] = useState({});
  useEffect(() => {
    var results = cartItems.reduce(function (results, item) {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItems(results);
  }, [cartItems]);
  return (
    <div className="cart-menu-container">
      <h3>
        Order <span>Menu</span>
      </h3>
      <div className="orders-wrapper">
        {Object.entries(groupedItems).map(([key, items]) => (
          <OrderItemCard
            key={items[0].id}
            product={items[0]}
            cardImg={items[0].image}
            text={items[0].title}
            amount={items.length}
            total={items.length * items[0].price}
          />
        ))}
      </div>
      {cartItems.length > 0 && (
        <button className="confirm-btn" onClick={handleShowScan}>
          Scan
        </button>
      )}
    </div>
  );
};

export default CartMenu;
