import React from "react";
import { Link } from "react-router-dom";
import "./HamburgerMenu.css";

function HamburgerMenu({ isHamburgerMenuOpen, setIsHamburgerMenuOpen }) {
  return (
    <div
    onClick={() => setIsHamburgerMenuOpen(false)}
      className={`hamburger-menu__wrapper ${
        isHamburgerMenuOpen ? "menu-open" : ""
      }`}
    >
      <div className="hamburger-menu__content">
        <Link to="/">
          <h2 style={{padding: '10px'}} onClick={() => setIsHamburgerMenuOpen(false)}>Create bracket</h2>
        </Link>
        <Link to="/saved">
          <h2 style={{padding: '10px'}} onClick={() => setIsHamburgerMenuOpen(false)}>Saved brackets</h2>
        </Link>
        <Link to="/profile">
          <h2 style={{padding: '10px'}} onClick={() => setIsHamburgerMenuOpen(false)}>Profile</h2>
        </Link>
      </div>
    </div>
  );
}

export default HamburgerMenu;
