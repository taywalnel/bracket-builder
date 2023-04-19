import React from "react";
import "./SideNav.css";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";

function SideNav() {
  return (
    <div className="side-nav-container">
      <div className="side-nav-links">
        <Link className="react-link" to="/create">
          <IconButton
            iconType="plus"
            backgroundColor="rgb(56, 189, 255)"
            diameter="45"
          />
        </Link>
        <Link className="react-link" to="/saved">
          <IconButton
            iconType="files"
            backgroundColor="rgb(56, 189, 255)"
            diameter="45"
          />
        </Link>
      </div>
      <div className="side-nav-links">
        <Link className="react-link" to="/account">
          <IconButton
            iconType="user"
            backgroundColor="rgb(56, 189, 255)"
            diameter="45"
          />
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
