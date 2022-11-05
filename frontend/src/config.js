const config = {
  APP_NAME: "groupomania",
  PORT: 3001,
  BACK_URL: "http://localhost:3001/api",
  FRONT_URL: "http://localhost:3000",
  public_path: ["login", "signup"],
  axios: {
    headers: {
      Authorization: null,
      "Content-Type": "application/json",
    },
  },
};

export default config;
