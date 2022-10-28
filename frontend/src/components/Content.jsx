import React, { useState } from "react";
import styles from "./Content.module.scss";
import Message from "./Message";
import axios from "axios";

const Content = ({ data, onSent, showSearch }) => {
  const [filter, setFilter] = useState("");

  const handleDelete = (messageId) => {
    axios
      .delete("http://localhost:3001/api/messages/" + messageId)
      .then((res) => {
        console.log("handleDelete !");
        onSent();
      });
  };

  const handleLike = () => {
    onSent();
  };

  const handleInput = (e) => {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  };

  return (
    <div className={`${styles.content} flex-fill  `}>
      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.searchBarContainer}>
            {/* Condition to display search bar */}
            {showSearch ? (
              <div
                className={`d-flex flex-row justify-content-center align-item-center my-30 br ${styles.searchBar}`}
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
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
