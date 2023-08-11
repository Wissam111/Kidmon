import { createContext } from "react";
import { useToast } from "react-native-toast-notifications";
export const AlertsContext = createContext();

export const AlertsContextProvider = ({ children }) => {
  const toast = useToast();

  const showSuccess = (text) => {
    toast.show(text, {
      type: "success",
      dangerColor: "green",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  };

  const showError = (text) => {
    toast.show(text, {
      type: "danger",
      dangerColor: "red",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  };
  const showWarning = (text) => {
    toast.show(text, {
      type: "warning",
      dangerColor: "yellow",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  };

  return (
    <AlertsContext.Provider value={{ showError, showWarning, showSuccess }}>
      {children}
    </AlertsContext.Provider>
  );
};
