import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import api from "../api";
import config from "../config";
import Error from "../components/Error";

const Test = () => {
  const { firstname, lastname, image, token, userId } = useContext(AppContext);

  const [error, setError] = useState();

  const truc = config.api;

  const handleClick = (e) => {
    let param = {
      messageId: 1234,
    };

    api
      .post("auth/test", param)
      .then((res) => {
        console.log("L utilisateur : ", res);
      })
      .catch((err) => {
        console.log("Il y a une erreur : ", err);
      });
  };

  const likeClick = (e) => {
    console.log("L utlikeClickilisateur : ");

    let param = {
      messageId: "6334560d72f8ff05c41d820d",
    };

    api
      .post("messages/like", param)
      .then((res) => {
        console.log("Le message : ", res);
      })
      .catch((err) => {
        console.log("Il y a une erreur : ", err);
      });
  };

  const handleError = (e) => {
    setError("TATA");
  };

  return (
    <div>
      <h1>TEST</h1>
      <Error error={error} />
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{userId}</p>
      <p>{image}</p>
      <button onClick={handleClick}>CHANGE</button>
      <button onClick={likeClick}>likeClick</button>
      <button onClick={() => handleError("James")}>error</button>
      <p>token {api.token}</p>
    </div>
  );
};

export default Test;
