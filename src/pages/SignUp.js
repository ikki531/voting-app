import React, { useState } from "react";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [userName, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="username">ユーザー名</label>
          <input
            name="username"
            type="username"
            id="username"
            placeholder="ユーザー名"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div> */}
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="メールアドレス"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="パスワード"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">確認画面</button>
      </form>
      <Link to="/login">ログインページ</Link>
    </div>
  );
};

export default SignUp;
