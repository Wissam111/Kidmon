import { useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
const EntryViewModel = () => {
  const [showOTP, setShowOTP] = useState(true);
  const [verify, setVerify] = useState({});
  const authRepository = AuthRepository();
  const navigation = useNavigation();
  const { dispatch } = useAuthContext();

  const handleLogin = async (phone) => {
    try {
      const data = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, code: "" });
      setShowOTP(false);
    } catch (error) {
      console.log(error);
    }
    console.log(phone);
  };

  const handleVerfication = async (optCode) => {
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      console.log("1111111111111111---------", data);
      handleAuthData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  const handleAuthData = async (data) => {
    if (data.error) {
      console.log(data.error);
      return;
    }
    //await AsyncStorage.setItem("authData", data);
    dispatch({ type: "LOGIN", payload: data });
    navigation.navigate("HomeParent");
    setShowOTP(true);
  };

  return { handleLogin, handleVerfication, showOTP, handleShowOTP };
};

export default EntryViewModel;
