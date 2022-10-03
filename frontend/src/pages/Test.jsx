import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import api from "../api";
import config from "../config";

const Test = () => {
  const { firstname, lastname, image, token, userId } = useContext(AppContext);

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

  const sayHello = (e) => {
    console.log("L utlikeClickilisateur : ", e);
  };

  return (
    <div>
      <h1>TEST</h1>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{userId}</p>
      <p>{image}</p>
      <button onClick={handleClick}>CHANGE</button>
      <button onClick={likeClick}>likeClick</button>
      <button onClick={() => sayHello("James")}>Greet</button>
      <p>token {api.token}</p>
    </div>
  );
};

export default Test;
