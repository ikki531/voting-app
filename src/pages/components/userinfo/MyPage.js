//////////////////////////////////////////////////////////////////////
///// React Router試し用 /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import firebase from "../../../config/firebase";

const MyPage = () => {
  const history = useHistory();

  // firestoreから取得したuser情報を入れるステート
  const [users, setUsers] = useState([]);
  // console.log(users);

  // AuthProviderからauthUserステートを受け取っている
  const authUser = useContext(AuthContext);

  // ログインしていればemailを取得
  const email = authUser && authUser.email;

  // ユーザー情報を取得
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .onSnapshot((snapshot) => {
        const getUsers = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            docid: doc.id,
          };
        });
        setUsers(getUsers);
      });
  }, [email]);

  // console.log(users);

  return (
    <>
      <h1>マイページ</h1>
      <br></br>
      {/* とりあえず、ユーザー名とメールアドレスと生年月日と性別だけ表示しとく */}
      {users[0] && <p>{users[0].username}</p>}
      {users[0] && <p>{users[0].email}</p>}
      {users[0] && <p>{users[0].gender}</p>}
      {users[0] && <p>{users[0].birthday}</p>}
      <br></br>
      <button onClick={() => history.push("/")}>戻る</button>
    </>
  );
};

export default MyPage;
