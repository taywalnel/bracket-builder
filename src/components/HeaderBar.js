import React from "react";
import IconButton from "./IconButton";
import { Link } from "react-router-dom";
import "./HeaderBar.css";
import TextIconButton from "./TextIconButton";

function HeaderBar() {
  return (
    <div className="header-bar-container">
      <Link className="react-link" to="/create">
        <h1 style={{ color: "#38BDFF" }}>Bracket builder</h1>
      </Link>
      <div className="header-bar-nav-links">
        <Link className="react-link" to="/create">
          <TextIconButton
            label="Create"
            iconType="plus"
            iconBackgroundColor="rgb(56, 189, 255)"
          />
        </Link>
        <Link className="react-link" to="/saved">
          <TextIconButton
            label="Saved brackets"
            iconType="files"
            iconBackgroundColor="rgb(56, 189, 255)"
          />
        </Link>
        <Link className="react-link" to="/account">
          <TextIconButton
            label="Account"
            iconType="user"
            iconBackgroundColor="rgb(56, 189, 255)"
          />
        </Link>
      </div>
    </div>
  );
}

export default HeaderBar;
