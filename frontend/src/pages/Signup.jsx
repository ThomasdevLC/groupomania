import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Signup.module.scss";
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import paperPlane from "../assets/images/paper-plane.png";
import backgroundImg from "../assets/images/background.jpg";
import Error from "../components/Error";

const Signup = () => {
  const yupSchema = yup.object({
    firstname: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court")
      .max(20, "Trop long"),

    lastname: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court")
      .max(20, "Trop long"),

    email: yup
      .string()
      .email("L'email doit être un email valide")
      .required("Le champ est obligatoire"),

    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(6, "Mot de passe trop court")
      .matches(/[a-z]/, "Le mot de passe  doit contenir au moins 1 minuscule")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins 1 majuscule")
      .matches(
        /[a-zA-Z]+[^a-zA-Z\s]+/,
        "Utilisez au moins 1 chiffre ou caractère spéciale."
      ),

    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne corespondent pas"
      ),
  });

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  });

  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  async function submit(values) {
    values.confirmPassword = undefined;

    const response = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const newUser = await response.json();
      reset(defaultValues);
      setSuccess(true);

      console.log(newUser);
    } else {
      const body = await response.json();
      setError(body.error);
    }
  }

  const navigate = useNavigate();

  return success ? (
    navigate("/login")
  ) : (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />

      <div
        className={`d-flex flex-row justify-content-center align-items-center ${styles.container}`}
      >
        <form className={styles.signupForm} onSubmit={handleSubmit(submit)}>
          <img
            className={styles.paperPlane}
            src={paperPlane}
            alt="logo paperpPlane"
          />
          <img className={styles.logo} src={logo} alt="logo groupomania" />
          <h1 className={`mb-20 ${styles.title}`}>Inscription</h1>{" "}
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="firstname"></label>
            <input
              className={styles.signinInput}
              {...register("firstname")}
              id="firstname"
              type="text"
              placeholder="Prénom"
              autoComplete="off"
              aria-label="renseigner votre prénom"
            />
            <div className={styles.errorBox}>
              {errors?.firstname && (
                <p className={styles.errorBoxText}>
                  {errors.firstname.message}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="name"></label>
            <input
              className={styles.signinInput}
              {...register("lastname")}
              id="lastname"
              type="text"
              placeholder="Nom"
              autoComplete="off"
              aria-label="renseigner votre nom"
            />
            <div className={styles.errorBox}>
              {errors?.lastname && <p>{errors.lastname.message}</p>}
            </div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="email"></label>
            <input
              className={styles.signinInput}
              {...register("email")}
              id="email"
              type="email"
              placeholder="email"
              autoComplete="off"
              aria-label="renseigner votre email"
            />
            <div className={styles.errorBox}>
              {errors?.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="password"></label>
            <input
              className={styles.signinInput}
              {...register("password")}
              id="password"
              type="password"
              placeholder="Mot de passe"
              autoComplete="off"
              aria-label="renseigner votre mot de passe"
            />
            <div className={styles.errorBox}>
              {errors?.password && <p>{errors.password.message}</p>}
            </div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="confirmPassword"></label>
            <input
              className={styles.signinInput}
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="Confirmation mot de passe"
              autoComplete="off"
              aria-label="confirmer votre mot de passe"
            />
            <div className={styles.errorBox}>
              {errors?.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <Error error={error} />
          <button
            disabled={isSubmitting}
            className={`btn btn-primary ${styles.btnSignin}`}
          >
            Créer compte
          </button>
          <NavLink to="/login">
            <p
              className={styles.link}
              aria-label="acceder à la page de connexion"
            >
              Connexion à votre compte
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};
export default Signup;
