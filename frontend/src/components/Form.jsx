import React, { useState, useContext } from "react";
import styles from "./Form.module.scss";
import axios from "axios";
import FileUpload from "./FileUpload";
import { AppContext } from "../context/AppContext";

const Form = () => {
  const { firstname, lastname, image, userId } = useContext(AppContext);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState({});

  const formatDate = () => {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date().toLocaleDateString("fr-FR", options);
  };

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", files);
    data.append("content", content);
    data.append("userFirstname", firstname);
    data.append("userLastname", lastname);
    data.append("userImage", image);
    data.append("userId", userId);
    data.append("date", formatDate());

    axios.post("http://localhost:3001/api/messages/", data);
    setContent("");
  };
  return (
    <div>
      <form
        className={`p-30  ${styles.form}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <textarea
          className={styles.textForm}
          autoFocus
          placeholder="Partagez ici..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>

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
