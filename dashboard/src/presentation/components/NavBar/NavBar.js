import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BiLogOut } from "react-icons/bi";
import { IoBagRemoveOutline, IoPersonAddOutline } from "react-icons/io5";

const NavBar = () => {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="navbar-container">
      <img src={require("../../../assets/imgs/family2.png")} />
      <ul className="nav-links">
        <li className={activeNav === 0 ? "active" : null}>
          <Link to="/home" className="nav-link" onClick={() => setActiveNav(0)}>
            <HiOutlineBuildingStorefront size={27} color="gray" />
          </Link>
        </li>
        <li className={activeNav === 1 ? "active" : null}>
          <Link
            to="/products"
            className="nav-link"
            onClick={() => setActiveNav(1)}
          >
            <IoBagRemoveOutline size={27} color="gray" />
          </Link>
        </li>
        <li className={activeNav === 2 ? "active" : null}>
          <Link
            to="/register-parent"
            className="nav-link"
            onClick={() => setActiveNav(2)}
          >
            <IoPersonAddOutline size={27} color="gray" />
          </Link>
        </li>

        <li className={"logout-nav-btn"}>
          <Link to="/" className="nav-link" onClick={() => setActiveNav(3)}>
            <BiLogOut size={27} color="gray" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
