import { useContext } from "react";
import { CatItemsContext } from "../context/CartItemsContext";

export const useCartItemsContext = () => {
  const context = useContext(CatItemsContext);
  if (!context) {
    return Error(
      "useCartItemsContext must be used inside an useCartItemsContextProvider"
    );
  }

  return context;
};
