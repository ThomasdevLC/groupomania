import React, { useContext, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.scss";
import backgroundImg from "../assets/images/background.jpg";
import { AppContext } from "../context/AppContext";
import FileUpload from "../components/FileUpload";
import Error from "../components/Error";
import config from "../config";
import axios from "axios";

const Profile = () => {
  const { firstname, lastname, image, userId, isAdmin, displayUser } =
    useContext(AppContext);

  const [files, setFiles] = useState({});
  const [error, setError] = useState();

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
    console.log("upload file");
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);

    let data = new FormData();
    data.append("image", files);

    axios
      .put(config.BACK_URL + "/auth/" + userId, data, config.axios)
      .then((user) => {
        displayUser(user);
        setFiles("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
        setFiles("");
      });
  };

  return (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
        <img className={` ${styles.userimg}`} src={image} alt="avatar" />
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
          aria-label="editer votre profile"
        >
          <span>EDITER</span>
        </button>

        <Error error={error} />

        <NavLink to="/">
          <i
            className={`fa-solid fa-house ${styles.homeIcon}`}
            aria-label="rejoindre la page principale"
            ref={inputRef}
            onKeyDown={handleClick}
            tabIndex={0}
          ></i>
        </NavLink>
      </form>
    </div>
  );
};
export default Profile;
