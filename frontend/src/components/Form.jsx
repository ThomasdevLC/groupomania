import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import styles from "./Form.module.scss";
import FileUpload from "./FileUpload";
import config from "../config";

const Form = ({ onSent, darkmode }) => {
  const { firstname, lastname, image, userId } = useContext(AppContext);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", files);
    data.append("content", content);
    data.append("userFirstname", firstname);
    data.append("userLastname", lastname);
    data.append("userImage", image);
    data.append("userId", userId);

    await axios.post(config.BACK_URL + "/messages/", data, config.axios);
    setContent("");
    setFiles("");
    onSent();
  };

  return (
    <div className={darkmode ? styles.backgroundFormDark : ""}>
      <form className={`p-20  ${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
        <div className={` ${styles.formContainer} d-flex `}>
          <div className={` ${styles.userBox}  `}>
            <img className={` ${styles.userimg}  `} src={image} alt="avatar" />
          </div>
          <textarea
            tabIndex={5}
            className={darkmode ? styles.textFormDark : styles.textForm}
            autoFocus
            placeholder={`Echangez avec vos collègues ${firstname}...`}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            aria-label="écrire votre message"
          ></textarea>
        </div>
        <FileUpload files={files} onFileSelected={(file) => setFiles(file)} />

        <button className={`mr-15 btn btn-reverse-primary ${styles.submitBtn}`} type="submit" value="Publier" aria-label="poster votre message">
          <i className="fa-regular fa-paper-plane mr-15"></i>
          <span>Poster</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
