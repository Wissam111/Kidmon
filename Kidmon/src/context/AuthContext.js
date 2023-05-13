import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      storeData(action.payload);
      return { authData: action.payload };
    case "SIGNUP":
      return { authData: action.payload };
    case "LOGOUT":
      handleLogout();
      return { authData: null };
  }
};

const storeData = async (data) => {
  try {
    await AsyncStorage.setItem("authData", JSON.stringify(data));
  } catch (e) {
    console.log("Error storing data:", e);
  }
};

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("authData");
    storeData(null);
  } catch (e) {
    console.log("Error removing data:", e);
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    authData: null,
  });
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("authData");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
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
