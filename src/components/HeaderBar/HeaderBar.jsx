import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./HeaderBar.css";

function HeaderBar() {
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

  return (
    <div className="header-bar__container">
      <div className="header-bar__header-wrapper">
        <img src="/assets/trophy.svg" alt="title icon" />
        <h3 className="header-bar__header">bracket builder</h3>
      </div>
      <div
        onClick={handleSignOut}
        className="header-bar__icon-wrapper icon-wrapper"
      >
        <img alt="download icon" src="/assets/logout.svg"></img>
      </div>
    </div>
  );
}

export default HeaderBar;
