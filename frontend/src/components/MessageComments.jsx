import React from "react";
import styles from "./MessageComments.module.scss";
// import axios from "axios";

const MessageComments = (props) => {
  console.log("comments", props.message.comments[0]);

  const formatDate = (date) => {
    let options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <button
          onClick={() => props.setTrigger(false)}
          className={styles.closeBtn}
        >
          X
        </button>
        <div className={` d-flex  align-items-center  ${styles.userBox}`}>
          <img
            className={`${styles.userImg}`}
            src={props.message.userImage}
            alt="avatar"
          />
          <div className={styles.signature}>
            <div className={styles.signatureName}>
              <b>{props.message.userFirstname} </b>
              <b>{props.message.userLastname}</b>
            </div>
            <div className={styles.signatureDate}>
              <em> {formatDate(props.message.date)}</em>
            </div>

            <p>{props.message.content}</p>
            <p>{props.message.comments.values}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default MessageComments;
