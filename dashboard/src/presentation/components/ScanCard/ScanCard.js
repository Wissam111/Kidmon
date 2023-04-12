import React from "react";
import "./ScanCard.css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
const ScanCard = ({ handleCloseScan }) => {
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
      <input type="text" onChange={(e) => console.log(e.target.value)} />
    </div>
  );
};

export default ScanCard;
