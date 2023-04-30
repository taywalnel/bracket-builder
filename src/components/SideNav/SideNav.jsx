import React from "react";
import { useLocation } from "react-router-dom";
import SideNavLink from "../SideNavLink/SideNavLink";
import "./SideNav.css";

function SideNav() {
  const location = useLocation();

  return (
    <div className="side-nav__container">
      <div className="side-nav__links">
        <SideNavLink currentPage={location.pathname} iconType="plus" to="/" />
        <SideNavLink
          currentPage={location.pathname}
          iconType="files"
          to="/saved"
        />
        <SideNavLink
          currentPage={location.pathname}
          iconType="profile"
          to="/profile"
        />
      </div>
    </div>
  );
}

export default SideNav;
