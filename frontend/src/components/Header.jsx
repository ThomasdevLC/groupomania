import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../assets/images/icon-left-font-two.png";
import userpic from "../assets/images/takeshi.jpg";

const Header = () => {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <img className="logo" src={logo} alt="logo groupomania" />

      <div className="flex-fill"></div>

      <NavLink to="/profile">
        <div className={` ${styles.userBox} d-flex mr-15 align-items-center`}>
          <img
            className={` ${styles.userimg} mr-15`}
            src={userpic}
            alt="avatar"
          />
          <span className="text-color">Bienvenue, Takeshi !</span>
        </div>
      </NavLink>

      <ul>
        <NavLink to="/login">
          <button className="btn btn-primary">
            <i class="fa-sharp fa-solid fa-circle-xmark mr-5"></i>
            Déconnexion
          </button>
        </NavLink>
      </ul>
    </header>
  );
};

export default Header;
