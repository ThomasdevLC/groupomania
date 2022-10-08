import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./Message.module.scss";
import { AppContext } from "../context/AppContext";
import EditingButtons from "./EditingButtons";
import api from "../api";

const Message = ({ message, onDelete, onChange, image }) => {
  const { userId, isAdmin } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [liked, setLiked] = useState(false);

  const handleEdit = () => {
    const data = {
      content: editContent ? editContent : message.content,
    };
    axios.put("http://localhost:3001/api/messages/" + message._id, data);

    setIsEditing(false);
  };

  const likeClick = () => {
    let param = {
      messageId: message._id,
    };

    api
      .post("messages/like", param)
      .then((res) => {
        console.log(" message ", res);
        onChange();
      })
      .catch((err) => {
        console.log(" error ", err);
      });
    setLiked(true);
  };

  console.log("user", userId);

  // Format date for messages timestamps //

  const formatDate = (date) => {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className={styles.message}>
      <div
        className={`${styles.messageTitle} d-flex flex-column justify-content-center align-items-center `}
      >
        <div className={styles.imageContainer}>
          <img
            className={styles.messageImg}
            src={message.imageUrl}
            alt="message"
          />
        </div>

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

        <div
          onClick={() => likeClick()}
          className={` ${styles.commentsLikesBox} p-30`}
        >
          <div>
            <i
              className={`mr-5 fa-solid fa-heart ${
                message.usersLiked.includes(userId) ? "text-primary" : ""
              }`}
            ></i>
          </div>
          <span>{message.usersLiked.length}</span>
        </div>

        <div className="mb-20">
          <div
            className={`  d-flex mr-15 align-items-center ${styles.userBox}`}
          >
            {userId === message.userId ? (
              <img
                className={`${styles.userImgConnected}`}
                src={message.userImage}
                alt="avatar"
              />
            ) : (
              <img
                className={`${styles.userImg}`}
                src={message.userImage}
                alt="avatar"
              />
            )}
          </div>

          <em>{message.userFirstname} </em>
          <em>{message.userLastname}, </em>
          <em> {formatDate(message.date)}</em>
        </div>

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
    </div>
  );
};

export default Message;
