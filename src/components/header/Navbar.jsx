import {
  faBars,
  faBolt,
  faCalendar,
  faHouse,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { useAuthorize } from "../../hooks/useAuthorize";
import { useAuth } from "../../context/AuthContext";

const Menu = () => {
  const { isAuthenticated } = useAuth();

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
      </ul>

      {isAuthenticated ? (
        <div className="logout">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <Link onClick={logout} className="logout-link">
            Logout
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-logo">
          <FontAwesomeIcon className="logos" icon={faBolt} />
          <h4 className="main-title">SanNotes.</h4>
        </div>
        <div onClick={handleMenuToggle} className="hamburger-menu">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={menu ? "menu-on" : "menu-off"}>
        <Menu />
      </div>
    </>
  );
};

export default Navbar;
