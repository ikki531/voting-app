import React, { useState, useEffect } from "react";
import firebase from "./config/firebase";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
