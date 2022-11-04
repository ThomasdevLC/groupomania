import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import tools from "../tools";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import paperPlane from "../assets/images/paper-plane.png";
import backgroundImg from "../assets/images/background.jpg";
import Error from "../components/Error";
import config from "../config";

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("Hello315@test.com");
  const [password, setPassword] = useState("Hello315");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const { displayUser } = useContext(AppContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        config.BACK_URL + "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        let data = res.data;
        console.log("TOKEN", data.token);

        /** Save token in config module */
        config.axios.headers.Authorization = data.token;

        /** Save token in cookie for session persistence */
        tools.setCookie("groupomania-token", data.token, 86400000);

        /** Call "displayuser" to pass values to Use Context  */
        displayUser(data.user);
        setPassword("");
        setSuccess(true);
      })
      .catch((error) => setError(error.response.data.error));
  };

  const navigate = useNavigate();

  return success ? (
    setTimeout(() => {
      navigate("/");
    }, 200)
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
            aria-label="rensiegner votre email"
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
            aria-label="renseigner votre mot de passe"
          />
        </div>

        <Error error={error} />

        <button
          className={`btn btn-primary ${styles.btnConnection}`}
          aria-label="se connecter"
        >
          Connexion{" "}
        </button>

        <NavLink to="/signup">
          <p
            className={styles.link}
            aria-label="acceder à la page d'inscription"
          >
            Créer votre compte
          </p>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
