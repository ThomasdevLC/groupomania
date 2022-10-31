import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import { AppContext } from "./context/AppContext";
import { useState } from "react";
import tools from "./tools";
import config from "./config";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  // Function for use context datas*/
  const displayUser = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setImage(user.imageUrl);
    setUserId(user._id);
    setisAdmin(user.isAdmin);
  };

  /** Getting cookie */
  // const tokenCookie = JSON.parse(tools.getCookie("groupomania-token"));
  const tokenCookie = tools.getCookie("groupomania-token");
  const route = window.location.href.split("/")[3];

  /** Setting cookie in Config module */
  if (tokenCookie) {
    console.log("Setting cookie", tokenCookie);
    config.setToken(tokenCookie);

    /** ON VA CHERCHER L UTILISATEUR CONNECTE EN BACK  */
    console.log("auth/ GET", config.axios);
    axios
      .get(config.BACK_URL + "/auth/", config.axios)
      .then((res) => {
        console.log("auth/ RES", config.axios);
        /** QUAND ON A LA REPONSE ON MET L UTILISATEUR DANS LE CONTEXT  */
        displayUser(res.data);
      })
      .catch((err) => {
        console.log("auth/ ERROR", err);
      });
  } else {
    /** ON REDIRIGE VERS LOGIN SI CE N EST PAS UNE PAGE PUBLIQUE */
    if (!config.public_path.includes(route))
      window.location.href = config.FRONT_URL + "/login";
  }

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setisAdmin] = useState(null);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContext.Provider
          value={{
            displayUser,
            firstname,
            lastname,
            image,
            userId,
            isAdmin,
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
    </QueryClientProvider>
  );
};

export default App;
