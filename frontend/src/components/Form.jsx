import React, { useState } from "react";
import styles from "./Form.module.scss";
import axios from "axios";
import FileUpload from "./FileUpload";

const Form = () => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState({});

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", files);
    data.append("content", content);

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
          autofocus
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
          <i class="fa-regular fa-paper-plane mr-15"></i>
          <span>Poster</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
