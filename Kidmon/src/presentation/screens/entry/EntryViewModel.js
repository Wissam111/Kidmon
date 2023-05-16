import { useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

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
    } catch (error) {
      console.log(error);
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
    setShowOTP(true);
  };

  return { handleLogin, handleVerfication, showOTP, handleShowOTP };
};

export default EntryViewModel;
