import { useEffect, useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertsContext } from "../../../hooks/useAlertsContext.js";

const EntryViewModel = () => {
  const authRepository = AuthRepository();
  const [showOTP, setShowOTP] = useState(false);
  const [verify, setVerify] = useState({});
  const { dispatch } = useAuthContext();
  const { setLoading } = useLoadingContext();
  const { showSuccess, showError } = useAlertsContext();
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (phone) => {
    setLoading(true);
    try {
      const data = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, code: "" });
      setShowOTP(true);
      setPhone(phone);
      showSuccess("phone verified, otp sent successfully");
    } catch (error) {
      console.log(error);
      showError(error?.error.message);
    }
    setLoading(false);
  };
  const handleVerfication = async (optCode) => {
    setLoading(true);
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      handleAuthData(data);
      showSuccess("OTP verified, login successful");
    } catch (error) {
      showError(error?.error.message);
    }
    setLoading(false);
  };

  const handleAuthData = (data) => {
    dispatch({ type: "LOGIN", payload: data });
    navigate("/", { replace: true });
  };

  const handleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData) {
      navigate("/", { replace: true });
    }
  }, []);

  return { handleLogin, handleVerfication, handleShowOTP, showOTP, phone };
};

export default EntryViewModel;
