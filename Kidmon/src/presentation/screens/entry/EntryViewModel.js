import { useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertsContext } from "../../../hooks/useAlertsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EntryViewModel = () => {
  const [showOTP, setShowOTP] = useState(true);
  const [verify, setVerify] = useState({});
  const authRepository = AuthRepository();
  const navigation = useNavigation();

  const { setLoading } = useLoadingContext();

  const { showSuccess, showError } = useAlertsContext();
  const { dispatch } = useAuthContext();

  const handleLogin = async (phone) => {
    setLoading(true);
    try {
      const data = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, code: "" });
      setShowOTP(false);
      showSuccess("OTP sent successfully");
    } catch (error) {
      console.log(error);
      console.log(showError);
      showError(error?.error?.message);
    }
    setLoading(false);
  };

  const handleVerfication = async (optCode) => {
    setLoading(true);
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      await handleAuthData(data);
      showSuccess("Logged in successfully");
    } catch (error) {
      console.log(error);
      showError(error?.error?.message);
    }
    // setLoading(false);
  };

  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  const handleAuthData = async (data) => {
    if (data?.error) {
      console.log(data?.error);
      return;
    }
    dispatch({ type: "LOGIN", payload: data });
    await storeData(data);

    setTimeout(() => {
      navigation.navigate("HomeParent");
      setShowOTP(true);
      setLoading(false);
    }, 1000);
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
