import React, { useEffect, useState } from "react";
import styles from "./Content.module.scss";
import Message from "./Message";
import axios from "axios";

const Content = (data) => {
  const handleDelete = async (messageId) => {
    await axios.delete("http://localhost:3001/api/messages/" + messageId);
  };

  return (
    <div className={`${styles.content} flex-fill p-20`}>
      <div className={` p-30 ${styles.card}`}>
        <div className={styles.grid}>
          {data.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((message) => (
              <Message
                key={message._id}
                message={message}
                onDelete={() => handleDelete(message._id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
