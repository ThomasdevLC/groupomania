import React, { useState } from "react";
import axios from "axios";
import styles from "./Message.module.scss";
import userpic from "../assets/images/takeshi.jpg";

const Message = ({ message, onDelete, image }) => {
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

        <div className="var">
          <div className={` ${styles.userBox} d-flex mr-15 align-items-center`}>
            <img
              className={` ${styles.userImg}`}
              src={message.userImage}
              alt="avatar"
            />
          </div>

          <em>
            {message.userFirstname}
            {message.userLastname},{" "}
          </em>
          <em>le 09/09/2022</em>
        </div>
        <div className="p-10">
          {isEditing ? (
            <button
              className="btn btn-primary mr-5"
              onClick={() => handleEdit(false)}
            >
              <i className="fa-solid fa-pen mr-5"></i>Valider
            </button>
          ) : (
            <button
              className="btn btn-primary mr-5"
              onClick={() => setIsEditing(true)}
            >
              <i className="fa-solid fa-pen mr-5"></i>Modifier
            </button>
          )}
          <button className="btn btn-primary" onClick={() => onDelete()}>
            <i className="fa-sharp fa-solid fa-trash mr-5"></i> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
