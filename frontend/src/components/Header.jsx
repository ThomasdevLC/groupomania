import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../assets/images/icon-left-font-two.png";
import tools from "../tools";
import config from "../config";
import HeaderMenu from "./HeaderMenu";
import { useState } from "react";

const Header = ({ showSearch, setShowSearch, darkmode, setDarkmode }) => {
  const handleLogout = () => {
    tools.setCookie(config.APP_NAME + "-token", "");
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`${styles.header} d-flex flex-row align-items-center br `}
    >
      <img className="logo" src={logo} alt="logo groupomania" />
      <div t className="flex-fill"></div>
      <i
        onClick={() => setDarkmode(!darkmode)}
        onKeyDown={() => setDarkmode(!darkmode)}
        className={`${
          darkmode
            ? "fa-solid fa-lightbulb btn-round-dark "
            : "fa-regular fa-lightbulb btn-round-dark "
        } ${styles.darkBtn}  `}
        aria-label="activer le darkmode"
        tabIndex={1}
      ></i>
      <i
        onClick={() => setShowSearch(!showSearch)}
        onKeyDown={() => setShowSearch(!showSearch)}
        className={`fa-solid fa-magnifying-glass btn-round  ${styles.searchGlass}`}
        aria-label="activer la barre de recherche"
        tabIndex={2}
      ></i>
      <ul className={styles.headerList}>
        <NavLink to="/profile">
          <button className="btn btn-reverse-primary mr-15" tabIndex={3}>
            <i className="fa-regular fa-user mr-5 "></i>
            Profil
          </button>
        </NavLink>
        <NavLink to="/login">
          <button
            onClick={handleLogout}
            className="btn btn-primary"
            tabIndex={4}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion
          </button>
        </NavLink>
      </ul>
      <i
        aria-label="accéder au menu"
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars mr-15 text-primary ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu />
        </>
      )}
    </header>
  );
};

export default Header;
