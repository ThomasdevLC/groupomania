import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../assets/images/icon-left-font-two.png";
import tools from "../tools";
import config from "../config";

const Header = () => {
  const handleLogout = () => {
    tools.setCookie(config.APP_NAME + "-token", "");
  };

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <img className="logo" src={logo} alt="logo groupomania" />
      <div className="flex-fill"></div>
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
        className={`fa-solid fa-bars mr-15 text-primary ${styles.headerXs}`}
      ></i>{" "}
    </header>
  );
};

export default Header;
