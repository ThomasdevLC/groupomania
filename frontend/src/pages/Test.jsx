import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Test = () => {
  const { displayUser, displayToken, firstname, lastname, image, token } =
    useContext(AppContext);

  const handleClick = (e) => {
    displayUser({
      firstname: "tata",
      lastname: "toto",
      imageUrl: "tutu",
    });
  };

  const handleClickToken = (e) => {
    displayToken("kjkhjkh");
  };

  let config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzJkNzJhZmIzMzE1Yzc4ZjIzNzI3MzMiLCJpYXQiOjE2NjQxMTkyNDMsImV4cCI6MTY2NDIwNTY0M30.F9BatJ5w6a_1m3WXV8rCXVwaPz6-90uYKulqSD6kDls",
    },
  };

  axios
    .get("http://localhost:3001/api/auth/632b29d8370ac320b0333e37", config)
    .then((res) => console.log("RES", res.data));

  return (
    <div>
      <h1>TEST</h1>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{image}</p>
      <button onClick={handleClick}>CHANGE</button>
      <button onClick={handleClickToken}>CHANGE TOKEN</button>
      <p>token {token}</p>
    </div>
  );
};

export default Test;
