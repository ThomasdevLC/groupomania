import React, { useState } from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../App.module.scss";
import Form from "../components/Form";
import { useQuery } from "react-query";
import axios from "axios";
import config from "../config";

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  const fetchData = async () =>
    await axios.get(config.BACK_URL + "/messages/", config.axios);

  const { isLoading, data, isSuccess, refetch } = useQuery(
    "messages",
    fetchData
  );

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        darkmode={darkmode}
        setDarkmode={setDarkmode}
      />
      <Form
        onSent={() => refetch()}
        darkmode={darkmode}
        setDarkmode={setDarkmode}
      />
      {isSuccess && !isLoading && data.data ? (
        <Content
          data={data.data}
          onSent={() => refetch()}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          darkmode={darkmode}
          setDarkmode={setDarkmode}
        />
      ) : (
        <div className="">"chargement en cours"</div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
