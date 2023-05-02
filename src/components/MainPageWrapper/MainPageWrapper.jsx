import React, { useState } from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import SideNav from "../SideNav/SideNav";
import "./MainPageWrapper.css";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

function MainPageWrapper({ children }) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  return (
    <div className="page-wrapper__container">
      <HeaderBar
        isHamburgerMenuOpen={isHamburgerMenuOpen}
        setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
      />
      <div className="page-wrapper__content-container">
        <div className="page-wrapper__side-nav-wrapper">
          <SideNav />
        </div>
        <div className="page-wrapper__outlet-wrapper">
          <div className="page-wrapper__outlet">{children}</div>
        </div>
        <HamburgerMenu
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
        />
      </div>
    </div>
  );
}

export default MainPageWrapper;
