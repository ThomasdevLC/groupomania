import React, { useEffect } from "react";
import styles from "./MessageComments.module.scss";
import axios from "axios";

const MessageComments = (props) => {
  useEffect(() => {
    const getComments = () => {
      axios
        .get("http://localhost:3001/api/messages/")
        .then((res) => console.log("COMMENT", res.data.comments));
    };
    getComments();
  }, []);

  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <button
          onClick={() => props.setTrigger(false)}
          className={styles.closeBtn}
        >
          X
        </button>
        <h1>Comments</h1>
        <p>Hello</p>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default MessageComments;
