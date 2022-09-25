import axios from "axios";

const api = {
  token: null,
  get(route, param) {
    return new Promise((resolve, reject) => {
      console.log("GET", route, param, this.token);

      let config = {
        headers: {
          Authorization: `Bearer ${this.token.replaceAll('"', "")}`,
        },
      };

      console.log("GET", config);

      let path = param
        ? `http://localhost:3001/api/${route}/${param}`
        : `http://localhost:3001/api/${route}`;

      console.log("path", path);

      axios
        .get(path, config)
        .then((res) => {
          console.log("RES", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default api;
