import React from "react";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Signup.module.scss";
import FileUpload from "../components/FileUpload";
import { useState } from "react";
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import paperPlane from "../assets/images/paper-plane.png";
import backgroundImg from "../assets/images/background.jpg";

const Signup = () => {
  const yupSchema = yup.object({
    firstname: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court")
      .max(20, "Top long"),

    lastname: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court")
      .max(20, "Top long"),

    email: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Trop court")
      .max(20, "Top long"),

    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(6, "Mot de passe trop court")
      .matches(/[a-z]/, "Le mot de passe  doit contenir au moins 1 majuscule")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins 1 minuscul")
      .matches(
        /[a-zA-Z]+[^a-zA-Z\s]+/,
        "Le mot de passe doit contenir au moins 1 chiffre ou caractère spéciale (@,!,#, etc)."
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
    image: {},
  };

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  });

  async function submit(values) {
    values.confirmPassword = undefined;
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const newUser = await response.json();
        reset(defaultValues);
        console.log(newUser);
      } else {
        console.log("erreur");
      }
    } catch (e) {
      console.log("erreur");
    }
  }

  const [files, setFiles] = useState({});

  return (
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
            />
            <div className={styles.errorBox}>
              {errors?.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => {
                <>
                  <FileUpload
                    files={files}
                    onFileSelected={(file) => onChange(file)}
                  />
                  <span>Hello</span>
                </>;
              }}
            />
          </div>
          <button
            disabled={isSubmitting}
            className={`btn btn-primary ${styles.btnSignin}`}
          >
            Créer compte
          </button>
          <NavLink to="/login">
            <p className={styles.link}>Connexion à votre compte</p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};
export default Signup;
