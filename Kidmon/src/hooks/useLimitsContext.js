import { LimitsContext } from "../context/LimitsContext";
import { useContext } from "react";

export const useLimitsContext = () => {
  const context = useContext(LimitsContext);

  if (!context) {
    throw Error(
      "useLimitsContext must be used inside an LimitsContextProvider"
    );
  }

  return context;
};
