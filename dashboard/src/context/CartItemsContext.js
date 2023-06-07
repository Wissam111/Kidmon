import { createContext, useReducer } from "react";
export const CatItemsContext = createContext();

export const CartReducer = (state, action) => {

  switch (action.type) {

    case "ADD_ITEM": {
      let newCartItems = {
        ...state.cartItems
      }

      console.log("Adding item")
      if (newCartItems[action.payload.id]) {
        newCartItems[action.payload.id] = {...newCartItems[action.payload.id] , amount: newCartItems[action.payload.id].amount + 1}
      }
      else {
        newCartItems[action.payload.id] = {
          ...action.payload,
          amount: 1
        }
      }

      return { ...state, cartItems: newCartItems };
    }
    case "REMOVE_ITEM":
      delete state.cartItems[action.payload.id]
      return { ...state, cartItems: { ...state.cartItems } };

    case 'UPDATE_AMOUNT':
      let newCartItems = {
        ...state.cartItems
      }
      const changedItem = action.payload

      if (changedItem.amount === 0) {
        delete newCartItems[action.payload.id]
      }
      else {
        newCartItems[action.payload.id].amount = action.payload.amount
      }


      return { ...state, cartItems: newCartItems }

    case "CLEAR":
      return { ...state, cartItems: {} };

    default:
      return state;
  }
};

export const CartItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cartItems: {},
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
  const productsTotal = (products) => {
    const total = products.reduce((accumulator, product) => {
      return accumulator + product.price * product.amount;
    }, 0);
    return total;
  };

  return (
    <CatItemsContext.Provider
      value={{
        ...state,
        dispatch,
        selectCartItemsById,
        totalCartItems,
        productsTotal,
      }}
    >
      {children}
    </CatItemsContext.Provider>
  );
};
