import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./Message.module.scss";
import { AppContext } from "../context/AppContext";
import EditingButtons from "./EditingButtons";
import MessageComments from "./MessageComments";
import config from "../config";

const Message = ({ message, onDelete, onLike, onComment }) => {
  const { userId, isAdmin } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleEdit = () => {
    const data = {
      content: editContent ? editContent : message.content,
    };

    axios.put(config.BACK_URL + "/messages/" + message._id, data, config.axios);

    setIsEditing(false);
  };

  const likeClick = () => {
    let param = {
      messageId: message._id,
    };

    axios
      .post(config.BACK_URL + "/messages/like", param, config.axios)
      .then((res) => {
        console.log(" message ", res);
        onLike();
      })
      .catch((err) => {
        console.log(" error ", err);
      });
  };

  // Format date for messages timestamps //

  const formatDate = (date) => {
    let options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className={styles.message}>
      <div className={` d-flex  align-items-center  ${styles.userBox}`}>
        <img
          className={`${styles.userImg}`}
          src={message.userImage}
          alt="avatar"
        />
        <div className={styles.signature}>
          <div className={styles.signatureName}>
            <b>{message.userFirstname} </b>
            <b>{message.userLastname + ", "}</b>
          </div>
          <div className={styles.signatureDate}>
            <em>{formatDate(message.date)}</em>
          </div>
        </div>
        <div className={`mr-15 ${styles.editBtn}`}></div>
        {/* displaying edit and delete buttons if user is poster or admin */}
        {userId === message.userId || isAdmin === true ? (
          <EditingButtons
            isEditing={isEditing}
            handleEdit={handleEdit}
            setIsEditing={setIsEditing}
            onDelete={onDelete}
          />
        ) : null}
      </div>

      <div
        className={`${styles.messageContent} d-flex flex-column justify-content-center align-items-center `}
      >
        {isEditing ? (
          <textarea
            className={styles.textMessage}
            defaultValue={editContent ? editContent : message.content}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        ) : (
          <p className={styles.textMessage}>
            {editContent ? editContent : message.content}
          </p>
        )}

        {message.imageUrl ? (
          <div className={styles.imageContainer}>
            <img
              className={styles.messageImg}
              src={message.imageUrl}
              alt="message"
            />
          </div>
        ) : (
          ""
        )}

        <div className={`${styles.commentsLikesBox} p-30`}>
          <div>
            <i
              onClick={() => likeClick()}
              className={`fa-regular fa-heart mr-5 ${
                message.usersLiked.includes(userId) ? "text-primary" : ""
              }`}
            ></i>
            <span>
              {message.usersLiked.length ? message.usersLiked.length : ""}
            </span>
          </div>
          <div className="">
            <i
              onClick={() => setShowComments(!showComments)}
              className="mr-5 fa-regular fa-comment"
            ></i>
            <span>
              {message.comments.length ? message.comments.length : ""}
            </span>
          </div>
        </div>
        {showComments && (
          <MessageComments message={message} onComment={onComment} />
        )}
      </div>
    </div>
  );
};

export default Message;
