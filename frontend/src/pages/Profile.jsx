import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.scss";
import backgroundImg from "../assets/images/background.jpg";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/632c873577029819db599a6b")
      .then((res) => setUserData(res.data));
  });

  return (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form className={styles.loginForm}>
        <img
          className={` ${styles.userimg} mb-20`}
          src={userData.imageUrl}
          alt="avatar"
        />
        <div className={styles.userName}>
          <span>{userData.firstname} </span>
          <span>{userData.lastname}</span>
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
