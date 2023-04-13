import React, { useState } from "react";
import "./RFIDReader.css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
const RFIDReader = ({ handleCloseScan, scanChild }) => {
  const [rfid, setRfid] = useState("");
  const RIFD_NUMBERS_SIZE = 10;
  const handleChange = (e) => {
    setRfid(e.target.value);
    if (e.target.value.length === RIFD_NUMBERS_SIZE) {
      scanChild(e.target.value);
    }
    if (e.target.value.length > RIFD_NUMBERS_SIZE) {
      setRfid("");
    }
  };

  return (
    <div className="scan-card-container">
      <IoClose
        size={25}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          margin: 10,
          cursor: "pointer",
        }}
        onClick={handleCloseScan}
        color="#00000070"
      />
      <div className="scan-card-info">
        <HiOutlineInformationCircle size={25} style={{ marginBottom: 10 }} />
        <p>
          Make sure to click on the input <br /> button to scan the RFID
          bracelet
        </p>
        <img src={require("../../../assets/imgs/scan.jpg")} />
      </div>
      <input value={rfid} type="text" onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default RFIDReader;
