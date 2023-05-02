import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Hamburger from "hamburger-react";
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
      <div className="header-bar__header-wrapper no-user-select">
        <img src="/assets/trophy.svg" alt="title icon" />
        <h3 className="header-bar__header">bracket builder</h3>
      </div>
      <div className="icon-hover-wrapper header-bar__icon-hover-wrapper">
        <div
          onClick={handleSignOut}
          className="header-bar__sign-out-button icon-wrapper"
        >
          <img
            className="icon"
            alt="download icon"
            src="/assets/logout.svg"
          ></img>
        </div>
      </div>

      <div
        onClick={toggleHamburgerMenu}
        className={`header-bar__hamburger-button icon-wrapper`}
      >
        <Hamburger
          height={20}
          width={20}
          size={20}
          color="#fff"
          toggled={isHamburgerMenuOpen}
          toggle={setIsHamburgerMenuOpen}
        />
      </div>
    </div>
  );
}

export default HeaderBar;
