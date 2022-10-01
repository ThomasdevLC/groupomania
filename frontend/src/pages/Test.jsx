import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import api from "../api";
import config from "../config";

const Test = () => {
  const { firstname, lastname, image, token, userId } = useContext(AppContext);

  const truc = config.api;

  const handleClick = (e) => {
    api
      .get("auth", "6336dfe046600a876e045cb7")
      .then((res) => {
        console.log("L utilisateur : ", res);
      })
      .catch((err) => {
        console.log("Il y a une erreur : ", err);
      });
  };

  return (
    <div>
      <h1>TEST</h1>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{userId}</p>
      <p>{image}</p>
      <button onClick={handleClick}>CHANGE</button>
      <p>token {api.token}</p>
    </div>
  );
};

export default Test;
