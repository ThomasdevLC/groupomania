import React from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../App.module.scss";
import Form from "../components/Form";

const Home = () => {
  console.log("Home");
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Form />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
