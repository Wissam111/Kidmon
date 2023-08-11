import React from "react";
import Input from "../../components/Input/Input";
import RegisterParentViewModel from "./RegisterParentViewModel";
import DefualtButton from "../../components/DefaultButton/DefaultButton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";

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
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                {/* <i className="pi pi-user"></i> */}
                <AiOutlineUser />
              </span>
              <InputText
                placeholder="First name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                {/* <i className="pi pi-user"></i> */}
                <AiOutlineUser />
              </span>
              <InputText
                placeholder="Last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>

            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                {/* <i className="pi pi-user"></i> */}
                <BsTelephoneFill />
              </span>
              <InputText
                placeholder="Phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="register-parent-btn-wrapper">
              <DefualtButton onClick={createParent} text="Create Parent" />
            </div>
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
