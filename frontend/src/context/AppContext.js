import React from "react";

const UserContext = React.createContext({
  user: "totot",
  setUser: () => {},
});

export default UserContext;
