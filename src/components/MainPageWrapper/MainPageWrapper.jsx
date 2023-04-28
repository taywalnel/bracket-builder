import React from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import SideNav from "../SideNav/SideNav";
import "./MainPageWrapper.css";

function MainPageWrapper({ children }) {
  return (
    <div className="page-wrapper__container">
      <HeaderBar />
      <div className="page-wrapper__content-container">
        <SideNav />
        <div className="page-wrapper__outlet-wrapper">
          <div className="page-wrapper__outlet">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainPageWrapper;
