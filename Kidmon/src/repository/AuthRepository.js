import { apiCall } from "../network/apiCall";

const AuthRepository = () => {
  const login = async (phone) => {
    console.log(phone);
    const data = apiCall("auth/send-auth-verification", "POST", {
      phone,
    });
    return data;
  };

  const verifyLogin = async (verfObj) => {
    const data = apiCall("auth/login-verify-phone", "POST", verfObj);
    return data;
  };
  return { login, verifyLogin };
};

export default AuthRepository;
