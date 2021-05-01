import React, { useContext } from "react";
import VotesList from "./components/VotesList";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthProvider";
import { Route } from "react-router-dom";

const Main = ({ history }) => {
  const authUser = useContext(AuthContext);

  const loginAlert = () => {
    alert("ログインしてください。");
  };

  // console.log(user.displayName);
  return (
    <>
      <h1>みんなが気になること♪</h1>
      <br></br>
      <span>
        {authUser ? (
          <button onClick={() => history.push("/CreateVoting")}>
            投票を作成
          </button>
        ) : (
          <>
            <button onClick={loginAlert}>投票を作成</button>
          </>
        )}
      </span>
      <br></br>
      <VotesList />
      <br></br>
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
