import { useApiContext } from "../hooks/useApiContext";

const AuthRepository = () => {
  const { apiCall } = useApiContext();

  const login = async (phone) => {
    const data = apiCall("api/send-auth-verification", "POST", {
      phone,
      isLogin: true,
    });
    return data;
  };

  const verifyLogin = async (verfObj) => {
    const data = apiCall("api/login-verify-phone", "POST", verfObj);
    return data;
  };
  return { login, verifyLogin };
};

export default AuthRepository;
