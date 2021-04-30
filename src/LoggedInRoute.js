import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const authUser = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default LoggedInRoute;
