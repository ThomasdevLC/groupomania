import React from "react";
import styles from "./FileUpload.module.scss";
import config from "../config";
import { useRef } from "react";

const FileUpload = ({ files, setFiles, removeFile, onFileSelected }) => {
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    onFileSelected(file);
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const currentPage = window.location.href;

  return (
    <div
      className={`${styles.card} d-flex flex-column align-items-center p-20 `}
    >
      <input
        ref={inputRef}
        type="file"
        name="file"
        id="file"
        className={styles.inputFile}
        accept="jpg,gif"
        onChange={uploadHandler}
        aria-label="charger une image"
      />

      {currentPage.includes(config.FRONT_URL + "/profile") ? (
        <label htmlFor="file">
          <i
            class="fa-solid fa-address-card"
            onKeyDown={handleClick}
            tabIndex={0}
          ></i>
        </label>
      ) : (
        <label htmlFor="file">
          <i
            className="fa-solid fa-cloud-arrow-up"
            onKeyDown={handleClick}
            tabIndex={6}
          ></i>
        </label>
      )}
    </div>
  );
};

export default FileUpload;
