const config = {
  PORT: 3001,
  BACK_URL: "http://localhost:3001/api",
  FRONT_URL: "http://localhost:3002",
  public_path: ["login", "signup"],
  axios: {
    headers: null,
  },
  setToken(token) {
    this.axios.headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  },
};

export default config;
