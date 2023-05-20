import React from "react";
import Input from "../../components/Input/Input";
import RegisterParentViewModel from "./RegisterParentViewModel";

import "./RegisterParent.css";
const RegisterParent = () => {
  const {
    firstName,
    lastName,
    phoneNumber,
    handleFirstNameChange,
    handleLastNameChange,
    handlePhoneChange,
    createParent,
  } = RegisterParentViewModel();

  return (
    <div className="page-container">
      <div className="inner-page">
        <div className="register-page-wrapper">
          <h1 className="register-header-h1">Add New Parent</h1>
          <div className="register-wrapper">
            <Input
              text="First Name"
              value={firstName}
              handleChange={handleFirstNameChange}
            />
            <Input
              text="Last Name"
              value={lastName}
              handleChange={handleLastNameChange}
            />
            <Input
              text="Phone Number"
              value={phoneNumber}
              handleChange={handlePhoneChange}
            />
            <button onClick={createParent}>Save</button>
          </div>
        </div>
        <div className="space"></div>
        <img src={require("../../../assets/imgs/family.png")} />
        <div className="space"></div>
      </div>
    </div>
  );
};

export default RegisterParent;
