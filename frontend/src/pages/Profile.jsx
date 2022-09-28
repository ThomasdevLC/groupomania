import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.scss";
import backgroundImg from "../assets/images/background.jpg";
import { AppContext } from "../context/AppContext";
import FileUpload from "../components/FileUpload";
import axios from "axios";

const Profile = () => {
  const { firstname, lastname, image, userId } = useContext(AppContext);

  const [files, setFiles] = useState({});

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("imageUrl", files);
    // data.append("email", email);
    // data.append("passwsord", password);
    data.append("firstname", firstname);
    data.append("lastname", lastname);

    await axios.put("http://localhost:3001/api/auth/" + userId, data);
  };

  return (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
        <img className={` ${styles.userimg} mb-20`} src={image} alt="avatar" />
        <div className={styles.userName}>
          <span>{firstname} </span>
          <span>{lastname}</span>
        </div>

        <FileUpload
          files={files}
          removeFile={removeFile}
          onFileSelected={(file) => setFiles(file)}
        />

        <button
          className={`mr-15 btn btn-reverse-primary ${styles.submitBtn}`}
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
