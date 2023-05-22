import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  const authData = action.payload;
  switch (action.type) {
    case "LOGIN":
      return { user: authData.user, token: authData.token };
    case "SIGNUP":
      return { user: authData.user, token: authData.token };
    case "LOGOUT":
      handleLogout();
      return { user: null, token: null };
    case "UPDATE_USER":
      return { user: authData };
  }
};

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log("Error removing data:", e);
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      const tokenJson = await AsyncStorage.getItem("token");
      return {
        user: userJson ? JSON.parse(userJson) : null,
        token: tokenJson ? JSON.parse(tokenJson) : null,
      };
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const authData = await getData();
      if (authData) {
        dispatch({ type: "LOGIN", payload: authData });
        navigation.navigate("HomeParent");
      }
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
