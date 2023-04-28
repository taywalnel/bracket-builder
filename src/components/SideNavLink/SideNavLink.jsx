import React from "react";
import { Link } from "react-router-dom";
import "./SideNavLink.css";

function SideNavLink({ currentPage, iconType, to }) {
  const isActivePage = currentPage === to;
  return (
    <div className="side-nav-link__root">
      <Link to={to}>
        <div className="side-nav-link__icon-wrapper icon-wrapper">
          <img className="side-nav-link__icon" src={`/assets/${iconType}.svg`} alt={`${iconType} icon`} />
        </div>
      </Link>
      <div
        className={`side-nav-link__active ${isActivePage ? "active-page" : ""}`}
      ></div>
    </div>
  );
}

export default SideNavLink;
