import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../config/firebase";
import { nanoid } from "nanoid";

const SignUpCheck = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setEmail(history.location.state.email);
    setPassword(history.location.state.password);
    setUserData({
      id: nanoid(),
      username: history.location.state.username,
      email: history.location.state.email,
      birthday: history.location.state.birthday,
      gender: history.location.state.gender,
    });
  }, [history]);

  async function authsubmit() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
      });
    return userData;
  }

  async function dbsubmit() {
    const setdata = await authsubmit();
    firebase
      .firestore()
      .collection("users")
      .add(setdata)
      .then(() => {
        history.push("/");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dbsubmit();
  };

  return (
    <>
      <h1>確認画面</h1>
      <div>
        <h2>ユーザー名</h2>
        <p style={{ fontWeight: "bold", color: "blue" }}>
          {history.location.state.username}
        </p>
      </div>
      <div>
        <h2>メールアドレス</h2>
        <p style={{ fontWeight: "bold", color: "blue" }}>
          {history.location.state.email}
        </p>
      </div>
      <div>
        <h2>パスワード</h2>
        <p style={{ fontWeight: "bold", color: "blue" }}>
          {history.location.state.password}
        </p>
      </div>
      <div>
        <h2>生年月日</h2>
        <p style={{ fontWeight: "bold", color: "blue" }}>
          {history.location.state.birthday}
        </p>
      </div>
      <div>
        <h2>性別</h2>
        <p style={{ fontWeight: "bold", color: "blue" }}>
          {history.location.state.gender}
        </p>
      </div>
      <button onClick={handleSubmit}>登録</button>
    </>
  );
};

export default SignUpCheck;
