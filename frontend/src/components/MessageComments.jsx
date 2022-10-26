import React, { useContext, useState } from "react";
import styles from "./MessageComments.module.scss";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MessageComments = ({ message, onSent }) => {
  const { userId, image, firstname, lastname } = useContext(AppContext);
  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      commenterId: userId,
      commenterPseudo: firstname + " " + lastname,
      text: text,
    });

    const config = {
      method: "patch",
      url: `http://localhost:3001/api/messages/comment-post/${message._id}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiMmFiNjExZTA3MjY1MjQ0ODlmYTMiLCJpYXQiOjE2NjY2MDEzNjIsImV4cCI6MTY2NjY4Nzc2Mn0.oJqM9_2YmyIoG1ES_8J3mhHzW9FdiB_-eO74_y5dw1Y",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    const data = JSON.stringify({
      commentId: e,
    });

    const config = {
      method: "patch",
      url: `http://localhost:3001/api/messages/delete-comment-post/${message._id}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiMmFiNjExZTA3MjY1MjQ0ODlmYTMiLCJpYXQiOjE2NjY2MDEzNjIsImV4cCI6MTY2NjY4Nzc2Mn0.oJqM9_2YmyIoG1ES_8J3mhHzW9FdiB_-eO74_y5dw1Y",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        onSent();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.commentsContainer}>
      {message.comments.map((comment) => {
        return (
          <div className="" key={comment._id}>
            <div className={styles.userBox}>
              <div className="leftPart">
                <img
                  className={styles.userImg}
                  src={message.comments.map((comment) => {
                    if (userId === comment.commenterId) return image;
                    else return null;
                  })}
                  alt="avatar"
                />
              </div>
              <div className="rightPart">
                <p className={styles.commenterPseudo}>
                  {comment.commenterPseudo}
                </p>
                <p className={styles.commenterText}>{comment.text}</p>

                <p>{comment.timestamp}</p>
                <button
                  className="btn-edit"
                  onClick={(e) => handleDelete(comment._id)}
                >
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {userId && (
        <form className={styles.commentForm} onSubmit={handleComment}>
          <textarea
            class={styles.textForm}
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder={`commenter le post de ${message.userFirstname} ...`}
          />
          <button
            className={`mr-15 btn btn-reverse-primary ${styles.submitBtn}`}
            type="submit"
            value="Publier"
          >
            <i className="fa-solid fa-comment mr-15"></i>
            <span>Poster</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageComments;
