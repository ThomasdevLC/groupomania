import React, { useState } from "react";
import styles from "./Content.module.scss";
import Message from "./Message";
import axios from "axios";
import config from "../config";

const Content = ({ data, onSent, showSearch, darkmode }) => {
  const [filter, setFilter] = useState("");

  console.log("data", data);

  const handleDelete = (messageId) => {
    axios
      .delete(config.BACK_URL + "/messages/" + messageId, config.axios)
      .then((res) => {
        onSent();
      });
  };

  const handleLike = () => {
    onSent();
  };

  const handleComment = () => {
    onSent();
  };

  const handleInput = (e) => {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  };

  return (
    <div className={`${styles.content} flex-fill  `}>
      <div className={styles.card}>
        <div className={darkmode ? styles.gridDark : styles.grid}>
          <div className={styles.searchBarContainer}>
            {/* Condition to display search bar */}
            {showSearch ? (
              <div
                className={`d-flex flex-row justify-content-center align-item-center my-30  ${
                  darkmode ? styles.searchBarDark : styles.searchBar
                }`}
              >
                <i className="fa-solid fa-magnifying-glass mr-15"></i>
                <input
                  onInput={handleInput}
                  className="flex-fill"
                  type="text"
                  placeholder="Rechercher"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .filter((message) =>
              message.userFirstname.toLowerCase().startsWith(filter)
            )

            .map((message) => (
              <Message
                key={message._id}
                message={message}
                onDelete={() => handleDelete(message._id)}
                onLike={() => handleLike()}
                onComment={() => handleComment()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
