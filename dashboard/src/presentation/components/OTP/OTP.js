import { useState } from "react";
import OTPInput from "react-otp-input";
import "./OTP.css";

const OTP = ({ handleVerfication, handleShowOTP }) => {
  const [otp, setOtp] = useState("");
  return (
    <div className="entry-otp-container">
      <img
        className="otp-user-img"
        src={require("../../../assets/imgs/user.png")}
      />
      <h2>Confirm OTP</h2>
      <p>
        Enter the OTP send to <span>0547973441</span>
      </p>
      <div className="otp">
        <OTPInput
          value={otp}
          inputStyle={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            textAlign: "center",
            margin: "0 5px",
          }}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span style={{ marginRight: 20 }}> </span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <img
        onClick={() => handleVerfication(otp)}
        className="send-verf-btn"
        src={require("../../../assets/icons/previous.png")}
      />
      <span onClick={handleShowOTP} className="resend-btn">
        Try again
      </span>
    </div>
  );
};

export default OTP;
