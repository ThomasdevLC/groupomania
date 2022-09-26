import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import api from "../api";

const Test = () => {
  const { firstname, lastname, image, token, userId } = useContext(AppContext);

  const handleClick = (e) => {
    api
      .get("auth", "632b29d8370ac320b0333e37")
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
      <p>token {token}</p>
    </div>
  );
};

export default Test;
