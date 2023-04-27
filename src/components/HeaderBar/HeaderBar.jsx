import React from "react";
import "./HeaderBar.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div className="header-bar-container">
      <div className="header-bar__header-wrapper">
        <h2 className="header-bar__header">Bracket builder</h2>
      </div>
      <div onClick={handleSignOut} className="header-bar__icon-wrapper">
        <img src="/assets/download.svg"></img>
      </div>
    </div>
  );
}

export default HeaderBar;
