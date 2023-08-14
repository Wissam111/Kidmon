import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  const authData = action.payload;
  switch (action.type) {
    case "LOGIN":
      return { user: authData.user, token: authData.token, isLoggedIn: true };
    case "SIGNUP":
      return { user: authData.user, token: authData.token, isLoggedIn: true };
    case "LOGOUT":
      // handleLogout();
      return { user: null, token: null, isLoggedIn: false };
    case "UPDATE_USER":
      return { user: authData };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
