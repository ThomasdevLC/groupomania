import React, { useState, useContext } from "react";
import styles from "./Form.module.scss";
import axios from "axios";
import FileUpload from "./FileUpload";
import { AppContext } from "../context/AppContext";

const Form = ({ onSent }) => {
  const { firstname, lastname, image, userId } = useContext(AppContext);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState({});

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", files);
    data.append("content", content);
    data.append("userFirstname", firstname);
    data.append("userLastname", lastname);
    data.append("userImage", image);
    data.append("userId", userId);

    await axios.post("http://localhost:3001/api/messages/", data);
    setContent("");
    onSent();
  };
  return (
    <div className={styles.backgroundForm}>
      <form
        className={`p-20  ${styles.form}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={` ${styles.formContainer} d-flex `}>
          <div className={` ${styles.userBox} d-flex `}>
            <img
              className={` ${styles.userimg} mr-15`}
              src={image}
              alt="avatar"
            />
          </div>
          <textarea
            className={styles.textForm}
            autoFocus
            placeholder={`Echangez avec vos collègues ${firstname}...`}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
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
          <i className="fa-regular fa-paper-plane mr-15"></i>
          <span>Poster</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
