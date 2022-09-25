import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import tools from "../tools";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import logo from "../assets/images/icon-left-font-monochrome-white.png";
import paperPlane from "../assets/images/paper-plane.png";
import backgroundImg from "../assets/images/background.jpg";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("nas@test.com");
  const [password, setPassword] = useState("Nas2022");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { displayUser, displayToken } = useContext(AppContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const onLogin = (data) => {
    console.log(data);
    displayUser(data.user);
    displayToken(data.token);
  };

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
          console.log(res);
          let data = res.data;

          tools.setCookie(
            "groupomania-token",
            JSON.stringify(data.token),
            86400000
          );

          onLogin(data);

          setPassword("");
          setSuccess(true);

          navigate("/test");
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
    setTimeout(() => {
      navigate("/test");
    })
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
