import { createContext, useReducer, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const NavigateCurrentRoute = () => {
    const storedRoute = localStorage.getItem("currentRoute");
    if (!storedRoute) {
      return;
    }
    navigate(storedRoute, { replace: true });
  };

  useEffect(() => {
    localStorage.setItem("currentRoute", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      dispatch({ type: "LOGIN", payload: authData });
      NavigateCurrentRoute();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
