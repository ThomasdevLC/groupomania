import axios from "axios";

const api = {
  token: null,
  get(route, param) {
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
          console.log("RES", route, res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default api;
