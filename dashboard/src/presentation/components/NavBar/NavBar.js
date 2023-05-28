import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BiLogOut } from "react-icons/bi";
import {
  IoBagRemoveOutline,
  IoPersonAddOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import Spacer from "../Spacer";

const NavBar = () => {
  const { dispatch } = useAuthContext();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("authData");
    dispatch({ type: "LOGOUT" });
  };
  const pathName = location.pathname;
  return (
    <div className="navbar-container">
      <img src={require("../../../assets/imgs/kidmonlogo4.png")} />
      <ul className="nav-links">
        <li className={pathName === "/" ? "active" : null}>
          <Link to="/" className="nav-link">
            <MdOutlineDashboard size={27} color="gray" />
          </Link>
        </li>

        <li className={pathName === "/store" ? "active" : null}>
          <Link to="/store" className="nav-link">
            <HiOutlineBuildingStorefront size={27} color="gray" />
          </Link>
        </li>

        <li className={pathName === "/products" ? "active" : null}>
          <Link to="/products" className="nav-link">
            <IoBagRemoveOutline size={27} color="gray" />
          </Link>
        </li>
        <li className={pathName === "/register-parent" ? "active" : null}>
          <Link to="/register-parent" className="nav-link">
            <IoPersonAddOutline size={27} color="gray" />
          </Link>
        </li>

        <div className="space"></div>

        <li className={"logout-nav-btn"}>
          <Link to="/entry" className="nav-link" onClick={handleLogout}>
            <BiLogOut size={27} color="gray" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
