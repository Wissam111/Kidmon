import { useState } from "react";
import { Alert } from "react-native";
import AuthRepository from "../../../repository/AuthRepository";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EntryViewModel = () => {
  const [showOTP, setShowOTP] = useState(true);
  const [verify, setVerify] = useState({});
  const authRepository = AuthRepository();
  const navigation = useNavigation();
  const { setLoading } = useLoadingContext();

  const { dispatch } = useAuthContext();

  const handleLogin = async (phone) => {
    setLoading(true);
    try {
      const data = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, code: "" });
      setShowOTP(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      handleAlert("error", "Error in login: " + error.error.message);
    }
    setLoading(false);
  };

  const handleVerfication = async (optCode) => {
    setLoading(true);
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      handleAuthData(data);
    } catch (error) {
      console.log(error);
      handleAlert("error", "Error with OTP: " + error.error.message);
    }
    setLoading(false);
  };

  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  const handleAuthData = async (data) => {
    if (data.error) {
      console.log(data.error);
      return;
    }
    dispatch({ type: "LOGIN", payload: data });
    navigation.navigate("HomeParent");
    storeData(data);
    setShowOTP(true);
  };
  const handleAlert = (type, message) => {
    const alertTitle = type === "success" ? "Success" : "Error";
    const alertButton = { text: "OK", onPress: () => {} };
    Alert.alert(alertTitle, message, [alertButton], { cancelable: false });
  };
  const storeData = async (authData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(authData.user));
      await AsyncStorage.setItem("token", JSON.stringify(authData.token));
    } catch (e) {
      console.log("Error storing data:", e);
    }
  };

  return { handleLogin, handleVerfication, showOTP, handleShowOTP };
};

export default EntryViewModel;
