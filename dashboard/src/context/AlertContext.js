import { createContext, useReducer } from "react";
export const AlertContext = createContext();

export const AlertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return { alertData: action.payload };
    case "RESET_ALERT":
      return { alertData: null };

    default:
      return state;
  }
};

export const AlertContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, {
    alertData: null,
  });

  const invokeAlert = (isSuccess, messg) => {
    if (isSuccess == null) {
      return;
    }

    if (isSuccess) {
      dispatch({
        type: "SET_ALERT",
        payload: { status: "success", text: `Success!` },
      });
    } else {
      dispatch({
        type: "SET_ALERT",
        payload: {
          status: "error",
          text: `There is an error accord - ` + messg,
        },
      });
    }
  };
  return (
    <AlertContext.Provider value={{ ...state, dispatch, invokeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
