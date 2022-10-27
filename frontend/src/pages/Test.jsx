import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import api from "../api";
// import config from "../config";
// import Error from "../components/Error";
import axios from "axios";

const Test = () => {
  const { firstname, lastname, image, token, userId } = useContext(AppContext);

  // const [error, setError] = useState();

  // const truc = config.api;

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

  const commentClick = () => {
    var data = JSON.stringify({
      commenterId: "633b2ab611e0726524489fa3",
      commenterPseudo: "Mike",
      text: "Hello 2410",
    });

    var config = {
      method: "patch",
      url: "http://localhost:3001/api/messages/comment-post/63568370b6ae0ad2138aa838",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiMmFiNjExZTA3MjY1MjQ0ODlmYTMiLCJpYXQiOjE2NjY2MDEzNjIsImV4cCI6MTY2NjY4Nzc2Mn0.oJqM9_2YmyIoG1ES_8J3mhHzW9FdiB_-eO74_y5dw1Y",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };

  return (
    <div>
      <h1>TEST</h1>
      {/* <Error error={error} /> */}
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{userId}</p>
      <p>{image}</p>
      <button onClick={handleClick}>CHANGE</button>
      <button onClick={likeClick}>likeClick</button>
      {/* <button onClick={() => handleError("James")}>error</button> */}
      <button onClick={commentClick}>Comment</button>
    </div>
  );
};

export default Test;
