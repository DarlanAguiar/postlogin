import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../Home";
import Login from "../components/Login";
import AuthProvider, { AuthContexts } from "../contexts/contexts";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContexts);

    if (!authenticated) {
      return <Navigate to={"/login"} />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
