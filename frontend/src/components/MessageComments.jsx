import React, { useContext, useState } from "react";
import styles from "./MessageComments.module.scss";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import config from "../config";

const MessageComments = ({ message, onComment }) => {
  const { userId, image, firstname, lastname, isAdmin } =
    useContext(AppContext);
  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      commenterId: userId,
      commenterPseudo: firstname + " " + lastname,
      text: text,
      commenterImage: image,
    });

    axios
      .patch(
        config.BACK_URL + `/messages/comment-post/${message._id}`,
        data,
        config.axios
      )
      .then(function () {
        setText("");
        onComment();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    const data = JSON.stringify({
      commentId: e,
    });

    axios
      .patch(
        config.BACK_URL + `/messages/delete-comment-post/${message._id}`,
        data,
        config.axios
      )
      .then(function (response) {
        onComment();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.commentsContainer}>
      {message.comments.map((comment) => {
        return (
          <div className={styles.commentsBox} key={comment._id}>
            <div className={styles.userBox}>
              <div className={styles.leftPart}>
                <pre></pre>
                <img
                  className={styles.userImg}
                  src={comment.commenterImage}
                  alt="avatar"
                />
              </div>
              <div className={`d-flex ${styles.rightPart}`}>
                <div className={styles.commentBox}>
                  <p className={styles.commenterPseudo}>
                    {comment.commenterPseudo}
                  </p>
                  <p className={styles.commenterText}>{comment.text}</p>

                  <p>{comment.timestamp}</p>
                </div>

                {userId === comment.commenterId || isAdmin === true ? (
                  <div className={styles.btnDelete}>
                    <button
                      className="btn-edit"
                      onClick={(e) => handleDelete(comment._id)}
                    >
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      {userId && (
        <form className={styles.commentForm} onSubmit={handleComment}>
          <textarea
            className={styles.textForm}
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder={`commenter le post de ${message.userFirstname} ...`}
          />
          <button
            className={` btn btn-reverse-primary ${styles.submitBtn}`}
            type="submit"
            value="Publier"
          >
            <i className="fa-solid fa-comment mr-5"></i>
            <span>Poster</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageComments;
