import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideNavLink.css";

function SideNavLink({ currentPage, iconType, to }) {
  const isActivePage = currentPage === to;
  const [activePageIdentifierStyle, setActivePageIdentifierStyle] = useState(
    getActivePageIdentifierStyle()
  );

  useEffect(() => {
    function handleResize() {
      setActivePageIdentifierStyle(getActivePageIdentifierStyle());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getActivePageIdentifierStyle() {
    if (window.innerWidth < 600) {
      return {
        top: "60px",
        left: "20px",
      };
    }
    return {
      left: "65px",
    };
  }

  return (
    <div className="side-nav-link__root">
      <Link to={to}>
        <div className="side-nav-link__icon-wrapper icon-wrapper">
          <img
            className="side-nav-link__icon"
            src={`/assets/${iconType}.svg`}
            alt={`${iconType} icon`}
          />
        </div>
      </Link>
      <div
        style={activePageIdentifierStyle}
        className={`side-nav-link__active ${isActivePage ? "active-page" : ""}`}
      ></div>
    </div>
  );
}

export default SideNavLink;
