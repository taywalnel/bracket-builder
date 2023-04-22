import React from "react";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import "./SideNavLink.css";

function SideNavLink({ currentPage, iconType, to }) {
  const isActivePage = currentPage === to;
  return (
    <div className="side-nav-link-root">
      <Link className="react-link" to={to}>
        <IconButton
          iconType={iconType}
          backgroundColor="rgb(56, 189, 255)"
          diameter="45"
        />
      </Link>
      <div
        className={`side-nav-link-active ${isActivePage ? "active-page" : ""}`}
      ></div>
    </div>
  );
}

export default SideNavLink;
