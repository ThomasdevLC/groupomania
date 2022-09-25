import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import { AppContext } from "./context/AppContext";
import { useState } from "react";

const App = () => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  const displayUser = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setImage(user.imageUrl);
  };

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
