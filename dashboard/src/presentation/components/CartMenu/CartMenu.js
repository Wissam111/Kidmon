import "./CartMenu.css";
import { useCartItemsContext } from "../../../hooks/useCartItemsContext";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import { useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const CartMenu = ({ handleShowScan }) => {
  const { cartItems, dispatch } = useCartItemsContext();

  const onClearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [dispatch])

  return (
    <div className="cart-menu-container">
      <h3>
        Order <span>Menu</span>
      </h3>

      {Object.keys(cartItems).length > 0 &&
        <AiOutlinePlus size={22} color="#cf4444" style={{ rotate: '45deg', cursor: 'pointer', alignSelf: 'flex-end' }} onClick={onClearCart}></AiOutlinePlus>
      }
      
      <div className="orders-wrapper">
        {
          Object.values(cartItems).map((item) => (
            <OrderItemCard
              key={item.id}
              product={item}
              cardImg={item.image}
              text={item.title}
              amount={item.amount}
              total={item.amount * item.price}
            />
          ))}
      </div>

      <div className="space"></div>

      {Object.keys(cartItems).length > 0 && (
        <button className="confirm-btn" onClick={handleShowScan}>
          Scan
        </button>
      )}
    </div>
  );
};

export default CartMenu;
