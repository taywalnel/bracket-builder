import React from "react";
import { useLocation } from "react-router-dom";
import SideNavLink from "../SideNavLink/SideNavLink";
import "./SideNav.css";

function SideNav() {
  const location = useLocation();

  return (
    <div className="side-nav__container">
      <div className="side-nav__links">
        <SideNavLink isCurrentPage={location.pathname === "/"} iconType="plus" to="/" />
        <SideNavLink
          isCurrentPage={location.pathname === "/saved"}
          iconType="files"
          to="/saved"
        />
        <SideNavLink
          isCurrentPage={location.pathname === "/profile"}
          iconType="profile"
          to="/profile"
        />
      </div>
    </div>
  );
}

export default SideNav;
