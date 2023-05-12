import { useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EntryViewModel = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [verify, setVerify] = useState({});
  const authRepository = AuthRepository();
  const navigation = useNavigation();
  const handleLogin = async (phone) => {
    console.log(phone + "---$");
    try {
      const data = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, code: "" });
      setShowLogin(false);
    } catch (error) {
      console.log(error);
    }
    console.log(phone);
  };

  const handleVerfication = async (optCode) => {
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      handleAuthData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAuthData = async (data) => {
    //await AsyncStorage.setItem("authData", data);
    //dispatch({ type: "LOGIN", payload: data });
    navigation.navigate("HomeParent");
  };

  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  return { handleLogin, handleVerfication, showLogin };
};

export default EntryViewModel;
