import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideNavLink from "../SideNavLink/SideNavLink";
import "./SideNav.css";

function SideNav() {
  const location = useLocation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count, location]);

  return (
    <div className="side-nav__container">
      <div className="side-nav__links">
        <SideNavLink currentPage={location.pathname} iconType="plus" to="/" />
        <SideNavLink
          currentPage={location.pathname}
          iconType="files"
          to="/saved"
        />
      </div>
    </div>
  );
}

export default SideNav;
