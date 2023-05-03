import React, { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import HeaderBar from "../HeaderBar/HeaderBar";
import ModalWrapper from "../Modals/ModalWrapper/ModalWrapper";
import SideNav from "../SideNav/SideNav";
import "./MainPageWrapper.css";

function MainPageWrapper({ children, ...props }) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  return (
    <>
      <ModalWrapper isOpen={props.isModalOpen}>{props.modalContent}</ModalWrapper>
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
    </>
    
  );
}

export default MainPageWrapper;
