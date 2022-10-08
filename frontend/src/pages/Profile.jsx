import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.scss";
import backgroundImg from "../assets/images/background.jpg";
import { AppContext } from "../context/AppContext";
import FileUpload from "../components/FileUpload";
import axios from "axios";

const Profile = () => {
  const { firstname, lastname, image, userId, isAdmin, displayUser } =
    useContext(AppContext);

  const [files, setFiles] = useState({});

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
    console.log("upload file");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", files);

    axios
      .put(`http://localhost:3001/api/auth/${userId}`, data)
      .then((user) => {
        displayUser(user);
      })
      .catch((error) => {
        console.log("l erreur", error);
      });
  };

  return (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
        <img className={` ${styles.userimg} mb-20`} src={image} alt="avatar" />
        <div className={styles.userName}>
          <span>{firstname} </span>
          <span>{lastname}</span>

          <div className={styles.userStatus}>
            {isAdmin === true ? (
              <div>statut : Administrateur</div>
            ) : (
              <div>statut : Utilisateur</div>
            )}
          </div>
        </div>
        <FileUpload
          files={files}
          removeFile={removeFile}
          onFileSelected={(file) => setFiles(file)}
        />

        <button
          className={`btn btn-reverse-primary ${styles.submitBtn}`}
          type="submit"
          value="Publier"
        >
          <span>EDITER</span>
        </button>

        <NavLink to="/">
          <i className="fa-solid fa-house"></i>
        </NavLink>
      </form>
    </div>
  );
};
export default Profile;
