import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./Message.module.scss";
import { AppContext } from "../context/AppContext";
import EditingButtons from "./EditingButtons";

const Message = ({ message, onDelete, image }) => {
  const { userId } = useContext(AppContext);

  console.log("utilisateur", userId);
  console.log("message user", message.userId);

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

  const handleClick = () => {
    axios.put(" http://localhost:3001/api/messages/:id/like/");
    setLiked(!liked);
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
          <p className="p-10">{editContent ? editContent : message.content}</p>
        )}

        <div className={` ${styles.commentsLikesBox} p-30`}>
          <div>
            <i className="fa-regular fa-message mr-5"></i>
            <span>2</span>
          </div>
          <div>
            <i
              onClick={handleClick}
              className={`fa-regular fa-heart mr-5 {${
                liked ? "text-primary" : ""
              }`}
            ></i>
          </div>
          <span>4</span>
        </div>

        <div className="mb-20">
          <div className={` ${styles.userBox} d-flex mr-15 align-items-center`}>
            <img
              className={` ${styles.userImg}`}
              src={message.userImage}
              alt="avatar"
            />
          </div>

          <em>{message.userFirstname} </em>
          <em>{message.userLastname}, </em>
          <em>le {message.date}</em>
        </div>

        {userId == message.userId ? (
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
