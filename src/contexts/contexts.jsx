import React, { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContexts = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (userEmail) {
      console.log("***" + userEmail);
    } else {
      console.log("***sem user email");
    }
  }, [userEmail]);

  return (
    <AuthContexts.Provider
      value={{ authenticated, setAuthenticated, userEmail, setUserEmail }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
