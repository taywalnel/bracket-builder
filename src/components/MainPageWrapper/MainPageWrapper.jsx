import React from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import SideNav from "../SideNav/SideNav";
import "./MainPageWrapper.css";

function MainPageWrapper({ children }) {
  return (
    <div className="app-container">
      <HeaderBar />
      <div className="app-main-content-container">
        <SideNav />
        <div className="app-route-outlet-wrapper">
          <div className="app-route-outlet">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainPageWrapper;
