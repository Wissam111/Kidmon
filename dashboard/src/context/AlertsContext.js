import { createContext, useRef } from "react";
import { Toast } from "primereact/toast";
export const AlertsContext = createContext();

export const AlertsContextProvider = ({ children }) => {
  const toast = useRef(null);

  const showSuccess = (text) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: text,
      life: 2500,
    });
  };

  const showInfo = (text) => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: text,
      life: 2500,
    });
  };

  const showWarn = (text) => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail: text,
      life: 2500,
    });
  };

  const showError = (text) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: text,
      life: 2500,
    });
  };

  return (
    <AlertsContext.Provider
      value={{ showError, showInfo, showSuccess, showWarn }}
    >
      {children}
      <Toast ref={toast} />
    </AlertsContext.Provider>
  );
};
