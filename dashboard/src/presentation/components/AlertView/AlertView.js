import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAlertContext } from "../../../hooks/useAlertContext";

import "./AlertView.css";

const AlertView = ({ status, text }) => {
  const { dispatch } = useAlertContext();
  const handleCloseAlert = () => {
    dispatch({ type: "RESET_ALERT" });
  };
  return (
    <div className="alert-view-container">
      <div className="close-alert">
        <AiOutlineCloseCircle
          size={20}
          color="#00000070"
          onClick={handleCloseAlert}
        />
      </div>
      <Alert severity={status}>
        <AlertTitle>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </AlertTitle>
        {text}
      </Alert>
    </div>
  );
};

export default AlertView;
