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
    <header className={`${styles.header} d-flex flex-row align-items-center `}>
      <img className="logo" src={logo} alt="logo groupomania" />
      <div className="flex-fill"></div>
      <i
        onClick={() => setDarkmode(!darkmode)}
        className={`${
          darkmode
            ? "fa-solid fa-lightbulb btn-round-dark mr-15 mr-15"
            : "fa-regular fa-lightbulb btn-round-dark mr-15 mr-15"
        } ${styles.darkBtn}  `}
      ></i>
      <i
        onClick={() => setShowSearch(!showSearch)}
        className={`fa-solid fa-magnifying-glass btn-round mr-15  ${styles.searchGlass}`}
      ></i>
      <ul className={styles.headerList}>
        <NavLink to="/profile">
          <button className="btn btn-reverse-primary mr-15">
            <i className="fa-regular fa-user mr-5 "></i>
            Profil
          </button>
        </NavLink>
        <NavLink to="/login">
          <button onClick={handleLogout} className="btn btn-primary">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion
          </button>
        </NavLink>
      </ul>
      <i
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
