import React, { useContext } from "react";
import List from "./components/List";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthProvider";
import { Route, Link } from "react-router-dom";

const Main = ({ history }) => {
  const authUser = useContext(AuthContext);

  // console.log(user.displayName);
  return (
    <>
      <h1>みんなが気になること♪</h1>
      <Link to="/CreateVoting">投票を作成</Link>
      <List />
      <Route
        render={() =>
          authUser ? (
            <button onClick={() => firebase.auth().signOut()}>
              ログアウト
            </button>
          ) : (
            <button onClick={() => history.push("/login")}>ログイン</button>
          )
        }
      />
    </>
  );
};

export default Main;
