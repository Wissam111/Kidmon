import { AlertContext } from "../context/AlertContext";
import { useContext } from "react";

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw Error(" useAlertContext must be used inside an AuthContextProvider");
  }

  return context;
};
