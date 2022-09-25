import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Test = () => {
  const { displayUser, firstname, lastname, image, token } =
    useContext(AppContext);

  const handleClick = (e) => {
    displayUser({
      firstname: "tata",
      lastname: "toto",
      imageUrl: "tutu",
    });
  };
  let config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzJkNzJhZmIzMzE1Yzc4ZjIzNzI3MzMiLCJpYXQiOjE2NjQwMjMxMTgsImV4cCI6MTY2NDEwOTUxOH0.Mm1MXbQIxWmW_aRIsnr-WI9FIOZXL8RV9KFxWR9xEf4",
    },
  };

  axios
    .get("http://localhost:3000/api/auth/632b29d8370ac320b0333e37", config)
    .then((res) => console.log("RES", res.data));

  return (
    <div>
      <h1>TEST</h1>
      <p>{firstname}</p>
      <button onClick={handleClick}>CHANGE</button>
      <p>{token}</p>
    </div>
  );
};

export default Test;
