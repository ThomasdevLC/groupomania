import React from "react";
import styles from "./FileUpload.module.scss";
import config from "../config";

const FileUpload = ({ files, setFiles, removeFile, onFileSelected }) => {
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    onFileSelected(file);
  };

  const currentPage = window.location.href;

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

      {currentPage.includes(config.FRONT_URL + "/profile") ? (
        <label htmlFor="file">
          <i class="fa-solid fa-address-card"></i>
        </label>
      ) : (
        <label htmlFor="file">
          <i className="fa-solid fa-cloud-arrow-up"></i>
        </label>
      )}
    </div>
  );
};

export default FileUpload;
