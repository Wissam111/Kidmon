import { useEffect, useState } from "react";
import AuthRepository from "../../../repository/AuthRepository";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../hooks/useLoadingContext";

const EntryViewModel = () => {
  const authRepository = AuthRepository();
  const [showOTP, setShowOTP] = useState(false);
  const [verify, setVerify] = useState({});
  const { dispatch } = useAuthContext();
  const { setLoading } = useLoadingContext();

  const navigate = useNavigate();

  const handleLogin = async (phone) => {
    setLoading(true);
    try {
      const data = await authRepository.login(phone);
      console.log(data);
      setVerify({ verifyId: data.verifyId, phone, code: "" });
      setShowOTP(true);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  const handleVerfication = async (event, optCode) => {
    setLoading(true);
    verify.code = optCode;
    try {
      const data = await authRepository.verifyLogin(verify);
      console.log(data);
      localStorage.setItem("authData", JSON.stringify(data.authData));
      dispatch({ type: "LOGIN", payload: data.authData });
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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

  return { handleLogin, handleVerfication, handleShowOTP, showOTP };
};

export default EntryViewModel;
