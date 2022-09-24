import React, { useEffect, useState } from "react";
import styles from "./Content.module.scss";
import Message from "./Message";
import axios from "axios";

const Content = () => {
  const [messageData, setMessageData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3000/api/messages/")
      .then((res) => setMessageData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (messageId) => {
    await axios.delete("http://localhost:3000/api/messages/" + messageId);
    await getData();
  };

  return (
    <div className={`${styles.content} flex-fill p-20`}>
      <div className={` p-30 ${styles.card}`}>
        <div className={styles.grid}>
          {messageData.map((message) => (
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
