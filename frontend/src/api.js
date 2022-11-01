// import axios from "axios";
// import config from "./config";

// const api = {
//   token: "",
//   get(route, param) {
//     console.log("API route", route);
//     console.log("API param", param);
//     console.log("API config", config);

//     const url = config.BACK_URL + "/api/";

//     return new Promise((resolve, reject) => {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${this.token.replaceAll('"', "")}`,
//         },
//       };

//       const path = param ? `${url}${route}/${param}` : `${url}${route}`;

//       axios
//         .get(path, config)
//         .then((res) => {
//           console.log("API res", route, res.data);
//           resolve(res.data);
//         })
//         .catch((err) => {
//           console.log("API error", err);
//           reject(err.response.data);
//         });
//     });
//   },
//   post(route, param) {
//     console.log("API route", route);
//     console.log("API param", param);
//     console.log("API config", config);

//     const url = config.BACK_URL + "/api/";
//     const path = `${url}${route}`;

//     return new Promise((resolve, reject) => {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${this.token.replaceAll('"', "")}`,
//         },
//       };

//       axios
//         .post(path, param, config)
//         .then((res) => {
//           console.log("API res", route, res.data);
//           resolve(res.data);
//         })
//         .catch((err) => {
//           console.log("API error", err);
//           reject(err);
//         });
//     });
//   },
// };

// export default api;
