import React from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../App.module.scss";
import Form from "../components/Form";
import { useQuery } from "react-query";
import axios from "axios";

const Home = () => {
  const fetchData = async () =>
    await axios.get("http://localhost:3001/api/messages/");

  const { data, isSuccess, refetch } = useQuery("messages", fetchData);

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Form onSent={() => refetch()} />
      {isSuccess && data.data ? (
        <Content data={data.data} onSent={() => refetch()} />
      ) : (
        <div className="">"chargement en cours"</div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
