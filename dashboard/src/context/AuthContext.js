import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      storeData(action.payload);
      return { authData: action.payload };
    case "SIGNUP":
      return { authData: action.payload };
    case "LOGOUT":
      cleanData();
      return { authData: null };
  }
};

const storeData = (data) => {
  localStorage.setItem("authData", JSON.stringify(data));
};
const cleanData = () => {
  localStorage.setItem("authData", null);
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    authData: null,
  });

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      dispatch({ type: "LOGIN", payload: authData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
