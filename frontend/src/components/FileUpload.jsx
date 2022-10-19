import React from "react";
import styles from "./FileUpload.module.scss";

const FileUpload = ({ files, setFiles, removeFile, onFileSelected }) => {
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    onFileSelected(file);
  };

  return (
    <div
      className={`${styles.card} d-flex flex-column align-items-center p-20 `}
    >
      <input
        type="file"
        name="file"
        id="file"
        className={styles.inputFile}
        accept="jpg,gif"
        onChange={uploadHandler}
      />
      <label for="file">
        <i class="fa-solid fa-cloud-arrow-up"></i>
      </label>
    </div>
  );
};

export default FileUpload;
