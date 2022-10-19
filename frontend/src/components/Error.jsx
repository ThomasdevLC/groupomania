import React from "react";
import styles from "./Error.module.scss";

const errorMessage = ({ error }) => {
  return (
    <div className={styles.errorMessage}>
      <p>{error}</p>
    </div>
  );
};

export default errorMessage;
