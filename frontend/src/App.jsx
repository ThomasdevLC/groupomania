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
  /** ON CREER UNE FONCTION POUR HYDRATER LES DONNEES */
  const displayUser = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setImage(user.imageUrl);
  };

  /** ON RECHERCHE LE COOKIE */
  const tokenCookie = tools.getCookie("groupomania-token");

  if (tokenCookie) {
    /** ON ENREGISTRE LE TOKEN DANS NOTRE MODULE API */
    api.token = tokenCookie;
  } else {
    //window.location.href = "http://localhost:3002/login";
    console.log("RETOUR AU Login");
  }

  api.get("auth/").then((res) => {
    displayUser(res);
  });

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [image, setImage] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider
          value={{
            displayUser,
            firstname,
            lastname,
            image,
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
