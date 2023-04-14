import { useEffect, useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { useAlertContext } from "../../../hooks/useAlertContext";

const EntryViewModel = () => {
  const authRepository = AuthRepository();
  const [showOTP, setShowOTP] = useState(false);
  const [verify, setVerify] = useState({});
  const { dispatch } = useAuthContext();
  const { setLoading } = useLoadingContext();
  const { invokeAlert } = useAlertContext();
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (phone) => {
    let isSuccess = null;
    let messg = "";
    setLoading(true);
    try {
      const data = await authRepository.login(phone);
      setVerify({ verifyId: data.verifyId, code: "" });
      setShowOTP(true);
      setPhone(phone);
    } catch (error) {
      console.log(error);
      messg = error?.error.message;
      isSuccess = false;
    }
    setLoading(false);
    invokeAlert(isSuccess, messg);
  };
  const handleVerfication = async (optCode) => {
    let isSuccess = null;
    let messg = "";
    setLoading(true);
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      handleAuthData(data);
    } catch (error) {
      messg = error?.error.message;
      isSuccess = false;
    }
    setLoading(false);
    invokeAlert(isSuccess, messg);
  };

  const handleAuthData = (data) => {
    localStorage.setItem("authData", JSON.stringify(data));
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
