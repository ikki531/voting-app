//////////////////////////////////////////////////////////////////////
///// React Router試し用 /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../config/firebase";
import { useParams } from "react-router";

const OtherUserInfo = () => {
  const history = useHistory();

  // 説明③（最後）
  // このuseParamsによってurlのパラメータ？(先ほどまでの説明であった /:idに渡された部分)を取得
  // localhost:3000/userinfo/AgoxL9Vtt1MJum4mの(AgoxL9Vtt1MJum4m)の部分
  // 正確にはparams.idとすることで取得したIDが使えるようになります
  const params = useParams();
  console.log(params);

  // console.log(user)

  const [users, setUsers] = useState("");

  useEffect(() => {
    /*実際に使用してる部分*/
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", params.id)
      /*usersコレクションのドキュメントのフィールドにあるidがparams.idと一致するものを取得しています*/
      .onSnapshot((snapshot) => {
        const users = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setUsers(users);
        /*あとは取得したデータをsetUsersでusersステートに格納し、実際にその値をコンポーネント内で使用することでデーターを画面に反映させています*/
      });
  }, [params.id]);

  console.log(users);

  return (
    <>
      <h1>他の人のページ</h1>
      <br></br>
      {/* とりあえず、ユーザー名とメールアドレスと生年月日と性別だけ表示しとく */}
      {users && <p>{users[0].username}</p>}
      {users && <p>{users[0].email}</p>}
      {users && <p>{users[0].gender}</p>}
      {users && <p>{users[0].birthday}</p>}
      {users && <p>{users[0].id}</p>}
      <br></br>
      <button onClick={() => history.push("/")}>戻る</button>
    </>
  );
};

export default OtherUserInfo;
