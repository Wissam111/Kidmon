import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const NavBar = () => {
  const [activeNav, setActiveNav] = useState(0);
  return (
    <div className="navbar-container">
      <ul className="nav-links">
        <li className={activeNav === 0 ? "active" : null}>
          <Link to="/" className="nav-link" onClick={() => setActiveNav(0)}>
            <HiOutlineBuildingStorefront size={27} color="gray" />
          </Link>
        </li>
        <li className={activeNav === 1 ? "active" : null}>
          <Link
            to="/settings"
            className="nav-link"
            onClick={() => setActiveNav(1)}
          >
            <IoSettingsOutline size={27} color="gray" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
