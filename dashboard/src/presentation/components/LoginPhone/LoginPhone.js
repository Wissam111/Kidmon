import { useState } from "react";
import "./LoginPhone.css";

const LoginPhone = ({ handleLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="login-phone-container">
      <img
        className="login-user-img"
        src={require("../../../assets/imgs/user.png")}
      />
      <h2>Login</h2>
      <input
        value={phoneNumber}
        type="text"
        placeholder="Enter Phone Number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <span>We will send you one time password (OTP)</span>
      <img
        onClick={() => handleLogin(phoneNumber)}
        className="send-opt-btn"
        src={require("../../../assets/icons/previous.png")}
      />
    </div>
  );
};

export default LoginPhone;
