import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import { AppContext } from "./context/AppContext";
import { useState } from "react";
import tools from "./tools";
import api from "./api";

const App = () => {
  const tokenCookie = tools.getCookie("groupomania-token");
  console.log("App", tokenCookie);

  const displayUser = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setImage(user.imageUrl);
  };

  if (tokenCookie) {
    api.token = tokenCookie;
  } else {
    console.log("RETOUR AU Login");
  }

  api.get("auth/").then((res) => {
    console.log("USER!", res);
    displayUser(res);
  });

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  const displayToken = (token) => {
    setToken(token);
  };

  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider
          value={{
            displayUser,
            firstname,
            lastname,
            image,
            displayToken,
            token,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
