import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./HeaderBar.css";

function HeaderBar({ isHamburgerMenuOpen, setIsHamburgerMenuOpen }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch {
      debugger;
    }
  }

  function toggleHamburgerMenu() {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  }

  return (
    <div className="header-bar__container">
      <div className="header-bar__header-wrapper">
        <img src="/assets/trophy.svg" alt="title icon" />
        <h3 className="header-bar__header">bracket builder</h3>
      </div>
      <div
        onClick={handleSignOut}
        className="header-bar__sign-out-button icon-wrapper"
      >
        <img className="icon" alt="download icon" src="/assets/logout.svg"></img>
      </div>
      <div
        onClick={toggleHamburgerMenu}
        className={`header-bar__hamburger-button icon-wrapper`}
      >
        <img className={`icon  ${isHamburgerMenuOpen ? "menu-open" : ""}`} alt="menu icon" src="/assets/hamburger.svg"></img>
      </div>
    </div>
  );
}

export default HeaderBar;
