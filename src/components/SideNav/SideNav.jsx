import React, { useEffect, useState } from "react";
import "./SideNav.css";
import SideNavLink from "../SideNavLink/SideNavLink";
import { useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [location]);

  return (
    <div className="side-nav-container">
      <div className="side-nav-links">
        <SideNavLink currentPage={location.pathname} iconType="plus" to="/" />
        <SideNavLink
          currentPage={location.pathname}
          iconType="files"
          to="/saved"
        />
      </div>
      <div className="side-nav-links">
        <SideNavLink
          currentPage={location.pathname}
          iconType="user"
          to="/account"
        />
      </div>
    </div>
  );
}

export default SideNav;
