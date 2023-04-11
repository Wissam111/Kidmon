import { createContext, useReducer } from "react";
export const CatItemsContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADDTOCART":
      return { cartItems: [...state.cartItems, action.payload] };
    case "REMOVEFROMCART":
      const index = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      ); //find first one with same id
      let newItemsCart = [...state.cartItems];
      if (index >= 0) {
        newItemsCart.splice(index, 1); //2nd arg mean remv only one item
      } else {
        console.log("this item doesnt exists in cart");
      }
      return { cartItems: newItemsCart };
    case "DELETECART":
      return { cartItems: [] };

    default:
      return state;
  }
};

export const CartItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cartItems: [],
  });

  const selectCartItemsById = (id) => {
    return state.cartItems.filter((product) => product.id == id);
  };
  const totalCartItems = () => {
    const total = state.cartItems.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);
    return total;
  };

  return (
    <CatItemsContext.Provider
      value={{ ...state, dispatch, selectCartItemsById, totalCartItems }}
    >
      {children}
    </CatItemsContext.Provider>
  );
};
