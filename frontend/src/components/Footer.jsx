import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <p>Copyright © 2022 Groupomania Inc.</p>
    </div>
  );
};

export default Footer;
