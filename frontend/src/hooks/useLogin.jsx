// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
// import axios from "axios";

// export const useLogin = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const { dispatch } = useAuthContext;

//   const login = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     const response = await axios.post(
//       "http://localhost:3000/api/auth/login",
//       JSON.stringify({ email, password }),
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     const json = await response.json();

//     if (!response.ok) {
//       setIsLoading(false);
//       setError(json.error);
//     }
//     if (response.ok) {
//       localStorage.setItem("user", JSON.stringify(json));
//     }
//     dispatch({ type: "LOGIN", payload: json });

//     setIsLoading(false);
//   };
//   return { login, isLoading, error };
// };
