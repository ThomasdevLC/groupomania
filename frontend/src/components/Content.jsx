import React from "react";
import styles from "./Content.module.scss";
import Message from "./Message";
import axios from "axios";

const Content = ({ data, onSent }) => {
  const handleDelete = (messageId) => {
    axios
      .delete("http://localhost:3001/api/messages/" + messageId)
      .then((res) => {
        console.log("handleDelete !");
        onSent();
      });
  };

  // const handleChange = (message) => {
  //   console.log("handleChange", message);

  //   let messages = data.data;
  //   let index = messages.indexOf(messages.find((m) => m._id === message._id));
  //   data.data[index] = message;
  // };
  console.log("data", JSON.stringify(data));

  return (
    <div className={`${styles.content} flex-fill p-20 `}>
      <div className={styles.card}>
        <div className={styles.grid}>
          {data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((message) => (
              <Message
                key={message._id}
                message={message}
                onDelete={() => handleDelete(message._id)}
                // onChange={() => handleChange(message)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
