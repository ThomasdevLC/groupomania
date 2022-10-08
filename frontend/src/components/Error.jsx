import React from "react";
import styles from "./Error.module.scss";

const EditingButtons = ({ error }) => {
  return (
    <div className={styles.errorMessage}>
      <p>{error}</p>
    </div>
  );
};

export default EditingButtons;
