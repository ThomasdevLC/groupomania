import axios from "axios";

const api = {
  token: "",
  get(route, param) {
    console.log("API get", route, param);
    return new Promise((resolve, reject) => {
      let config = {
        headers: {
          Authorization: `Bearer ${this.token.replaceAll('"', "")}`,
        },
      };

      let path = param
        ? `http://localhost:3001/api/${route}/${param}`
        : `http://localhost:3001/api/${route}`;

      axios
        .get(path, config)
        .then((res) => {
          console.log("API res", route, res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("API error", err);
          reject(err);
        });
    });
  },
};

export default api;
