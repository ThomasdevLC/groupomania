import React from "react";
import styles from "./FileUpload.module.scss";

const FileUpload = ({ files, setFiles, removeFile, onFileSelected }) => {
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    onFileSelected(file);
  };

  return (
    <div
      className={`${styles.card} d-flex flex-column align-items-center p-20 mb-20`}
    >
      <input
        type="file"
        className={styles.fileInput}
        accept="jpg,gif"
        onChange={uploadHandler}
      />
      <i className="fa-regular fa-image"></i>
      <label for="fileInput">Photo</label>
      {/* <button>
     
      </button> */}
    </div>
  );
};

export default FileUpload;
