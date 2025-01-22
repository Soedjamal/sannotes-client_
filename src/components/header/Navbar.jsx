import {
  faBars,
  faCalendar,
  faGear,
  faHouse,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

const Menu = () => {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className="menu-container">
      <ul className="menu-list-container">
        <li className="menu-list">
          <FontAwesomeIcon className="menu-link-title" icon={faCalendar} />
          <Link className="menu-link" to="/todos">
            Todos
          </Link>
        </li>
        <li className="menu-list">
          <FontAwesomeIcon className="menu-link-title" icon={faUser} />
          <Link className="menu-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="menu-list">
          <FontAwesomeIcon className="menu-link-title" icon={faHouse} />
          <Link className="menu-link" to="/">
            Home
          </Link>
        </li>
        <li className="menu-list">
          <FontAwesomeIcon className="menu-link-title" icon={faGear} />
          <Link className="menu-link" to="/">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const MenuBar = () => {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useLogout();

  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <nav className="menu-bar-container">
      <ul className="menu-bar-list-container">
        <li className="menu-bar-list">
          <Link
            className={`menu-bar-link ${currentPath === "/" ? "active" : ""}`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="menu-bar-list">
          <Link
            className={`menu-bar-link ${
              currentPath === "/todos" ? "active" : ""
            }`}
            to="/todos"
          >
            Todos
          </Link>
        </li>
        <li className="menu-bar-list">
          <Link
            className={`menu-bar-link ${
              currentPath === "/profile" ? "active" : ""
            }`}
            to="/profile"
          >
            Profile
          </Link>
        </li>
        <li className="menu-bar-list">
          <Link
            className={`menu-bar-link ${
              currentPath === "/settings" ? "active" : ""
            }`}
            to="/"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Navbar = ({ title }) => {
  const [menu, setMenu] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  let showOnScroll = true;

  useEffect(() => {
    if (showOnScroll == false) return setIsScroll((prev) => true);
    const onScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className={`nav-container ${isScroll ? "shadowed" : ""}`}>
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
        <MenuBar />
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
