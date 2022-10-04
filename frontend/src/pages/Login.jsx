import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import tools from "../tools";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import logo from "../assets/images/icon-left-font-monochrome-white.png";
import paperPlane from "../assets/images/paper-plane.png";
import backgroundImg from "../assets/images/background.jpg";
import config from "../config";

import api from "../api";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("Hello315@test.com");
  const [password, setPassword] = useState("Hello315");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { displayUser } = useContext(AppContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:3001/api/auth/login",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          let data = res.data;
          console.log("TOKEN", data.token);

          /** Saving token in API module */
          api.token = data.token;

          /** Saving token in cookie for session persistence */
          tools.setCookie(
            "groupomania-token",
            JSON.stringify(data.token),
            86400000
          );

          /** Calling "displayuser" to pass values to Use Context variables */
          displayUser(data.user);

          setPassword("");
          setSuccess(true);
        });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("pas de réponse serveur");
      } else if (err.response?.status === 400) {
        setErrMsg("mot de passe ou email manquant");
      } else if (err.response?.status === 401) {
        setErrMsg("Vous n'êtes pas inscrit");
      } else {
        setErrMsg("Erreur authentification");
      }
      errRef.current.focus();
    }
  };

  const navigate = useNavigate();

  return success ? (
    navigate("/")
  ) : (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <img
          className={styles.paperPlane}
          src={paperPlane}
          alt="logo paperpPlane"
        />
        <img className={styles.logo} src={logo} alt="logo groupomania" />
        <h1 className={`mb-20 ${styles.title}`}>Login</h1>
        <div className="d-flex flex-column mb-20">
          <input
            className={styles.loginInput}
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="d-flex flex-column ">
          <input
            className={styles.loginInput}
            id="password"
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div className={styles.errorBox}>
          <p className={styles.errorBoxText} ref={errRef}>
            {errMsg}
          </p>
        </div>

        <button className={`btn btn-primary ${styles.btnConnection}`}>
          Connexion{" "}
        </button>

        <NavLink to="/signup">
          <p className={styles.link}>Créer votre compte</p>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
