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
import api from "./api";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  /** ON CREER UNE FONCTION POUR HYDRATER LES DONNEES */
  const displayUser = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setImage(user.imageUrl);
    setUserId(user._id);
    setisAdmin(user.isAdmin);
  };

  // const navigate = useNavigate();

  /** ON RECHERCHE LE COOKIE */
  const tokenCookie = tools.getCookie("groupomania-token");
  const route = window.location.href.split("/")[3];

  if (tokenCookie) {
    /** ON ENREGISTRE LE TOKEN DANS NOTRE MODULE API */
    api.token = tokenCookie;
  } else {
    if (!config.public_path.includes(route))
      window.location.href = config.FRONT_URL + "/login";
  }

  api.get("auth/").then((res) => {
    displayUser(res);
  });

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
