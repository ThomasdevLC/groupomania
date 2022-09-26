import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.scss";
import backgroundImg from "../assets/images/background.jpg";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { firstname, lastname, image } = useContext(AppContext);

  return (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form className={styles.loginForm}>
        <img className={` ${styles.userimg} mb-20`} src={image} alt="avatar" />
        <div className={styles.userName}>
          <span>{firstname} </span>
          <span>{lastname}</span>
        </div>

        <button className={`btn btn-primary ${styles.btnConnection}`}>
          Connexion{" "}
        </button>

        <NavLink to="/">
          <i className="fa-regular fa-circle-left"></i>
        </NavLink>
      </form>
    </div>
  );
};
export default Profile;
