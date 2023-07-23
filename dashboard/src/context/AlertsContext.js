// import { createContext, useReducer } from "react";
// export const AlertContext = createContext();

// export const AlertReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_ALERT":
//       return { alertData: action.payload };
//     case "RESET_ALERT":
//       return { alertData: null };

//     default:
//       return state;
//   }
// };

// export const AlertContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AlertReducer, {
//     alertData: null,
//   });

//   const invokeAlert = (isSuccess, messg) => {
//     if (isSuccess == null) {
//       return;
//     }

//     if (isSuccess) {
//       dispatch({
//         type: "SET_ALERT",
//         payload: { status: "success", text: messg },
//       });
//     } else {
//       dispatch({
//         type: "SET_ALERT",
//         payload: {
//           status: "error",
//           text: `There is an error accord - ` + messg,
//         },
//       });
//     }
//   };
//   return (
//     <AlertContext.Provider value={{ ...state, dispatch, invokeAlert }}>
//       {children}
//     </AlertContext.Provider>
//   );
// };
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
