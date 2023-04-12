import React from "react";
import LoginPhone from "../../components/LoginPhone/LoginPhone";
import OTP from "../../components/OTP/OTP";
import EntryViewModel from "./EntryViewModel";

import "./Entry.css";

const Entry = () => {
  const { handleLogin, handleVerfication, handleShowOTP, showOTP, phone } =
    EntryViewModel();
  return (
    <div className="page-container">
      <div className="entry-wrapper">
        <div className="entry-cta">
          {!showOTP ? (
            <LoginPhone handleLogin={handleLogin} />
          ) : (
            <OTP
              handleVerfication={handleVerfication}
              handleShowOTP={handleShowOTP}
              phone={phone}
            />
          )}
        </div>

        <div className="entry-img-background"></div>
      </div>
    </div>
  );
};

export default Entry;
