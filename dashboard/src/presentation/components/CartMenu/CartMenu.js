import { useEffect, useState } from "react";
import "./CartMenu.css";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import OrderItemCard from "../OrderItemCard/OrderItemCard";

const CartMenu = ({ handleShowScan }) => {
  const { cartItems, totalCartItems } = useCartItemsContext();
  const [groupedItems, setGroupedItems] = useState({});
  const cartTotal = totalCartItems();
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
            product={items[0]}
            cardImg={items[0].image}
            text={items[0].text}
            amount={items.length}
            total={items.length * items[0].price}
          />
        ))}
      </div>
      <button onClick={handleShowScan}>Scan</button>
      {/* {cartItems.length > 0 && <button>Charge {cartTotal} P</button>} */}
    </div>
  );
};

export default CartMenu;
