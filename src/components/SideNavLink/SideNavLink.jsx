import React from "react";
import { Link } from "react-router-dom";
import "./SideNavLink.css";

function SideNavLink({ isCurrentPage, iconType, to }) {
  return (
    <div className="side-nav-link__root">
      <Link to={to}>
        <div className={`icon-hover-wrapper ${isCurrentPage ? 'icon-selected' : ''}`}>
          <div className="side-nav-link__icon-wrapper icon-wrapper">
            <img
              className="side-nav-link__icon"
              src={`/assets/${iconType}.svg`}
              alt={`${iconType} icon`}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SideNavLink;
