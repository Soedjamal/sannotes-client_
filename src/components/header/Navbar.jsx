import {
  faBars,
  faBolt,
  faCalendar,
  faGear,
  faHouse,
  faRightFromBracket,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { useAuthorize } from "../../hooks/useAuthorize";
import { useAuthContext } from "../../context/AuthContext";

const Menu = () => {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className="menu-container">
      <ul className="menu-list-container">
        <li className="menu-list">
          <FontAwesomeIcon icon={faCalendar} />
          <Link className="menu-link" to="/todos">
            Todos
          </Link>
        </li>
        <li className="menu-list">
          <FontAwesomeIcon icon={faUser} />
          <Link className="menu-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="menu-list">
          <FontAwesomeIcon icon={faHouse} />
          <Link className="menu-link" to="/">
            Home
          </Link>
        </li>
        <li className="menu-list">
          <FontAwesomeIcon icon={faGear} />
          <Link className="menu-link" to="/">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Navbar = ({ title }) => {
  const [menu, setMenu] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-logo">
          <img className="logos" src="/sannotes.svg" />
          <div
            style={title == "none" ? { display: "none" } : null}
            className="main-title"
          >
            <h4 className="first-title">san</h4>
            <h4 className="second-title">notes.</h4>
          </div>
        </div>
      </div>
      {menu ? (
        <div onClick={handleMenuToggle} className="hamburger-menu">
          <FontAwesomeIcon icon={faX} />
        </div>
      ) : (
        <div onClick={handleMenuToggle} className="hamburger-menu">
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <div className={menu ? "menu-on" : "menu-off"}>
        <Menu />
      </div>
      {menu ? (
        <div onClick={handleMenuToggle} className="minvisible-btn"></div>
      ) : null}
    </>
  );
};

export default Navbar;
