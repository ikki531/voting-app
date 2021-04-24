import React from "react";
import List from "./components/List";
import firebase from "../config/firebase";

const Main = () => {
  return (
    <>
      <h1>Main</h1>
      <List />
      <button onClick={() => firebase.auth().signOut()}>Logout</button>
    </>
  );
};

export default Main;
