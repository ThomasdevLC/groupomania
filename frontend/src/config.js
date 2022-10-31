const config = {
  APP_NAME: "groupomania",
  PW_MONGO: "KnHCUKblG8KdXgIX",
  USER_MONGO: "ThomasLC",
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
