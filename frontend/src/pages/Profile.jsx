import React, { useContext, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [success, setSuccess] = useState(false);

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
        setError(error.response.data);
        setFiles("");
      });
  };

  const navigate = useNavigate();

  const handleDelete = (e) => {
    setTimeout(() => {
      if (window.confirm("Etes vous sûr de vouloir supprimer votre compte ?")) {
        axios.delete(config.BACK_URL + "/auth/" + userId, config.axios);
        setSuccess(true);
      } else {
        navigate("/profile");
      }
    }, 800);
  };

  return success ? (
    navigate("/login")
  ) : (
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
        <FileUpload files={files} onFileSelected={(file) => setFiles(file)} />

        <button
          className={`btn btn-reverse-primary ${styles.submitBtn}`}
          type="submit"
          value="Publier"
          aria-label="editer votre profile"
        >
          <span>EDITER</span>
        </button>
        <Error error={error} />
        <div className={styles.deleteLink}>
          <p onClick={handleDelete}>Supprimer compte</p>
        </div>

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
