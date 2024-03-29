import { useApiContext } from "../hooks/useApiContext";

const AuthRepository = () => {
  const { apiCall } = useApiContext();

  const login = async (phone) => {
    const data = apiCall("auth/send-auth-verification", "POST", {
      phone,
    });
    return data;
  };

  const verifyLogin = async (verfObj) => {
    console.log(verfObj);
    const data = apiCall("auth/login-verify-phone", "POST", verfObj);
    return data;
  };
  return { login, verifyLogin };
};

export default AuthRepository;
