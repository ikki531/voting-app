import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import firebase from "../config/firebase";

const CreateVoting = () => {
  const history = useHistory();

  const [questionValue, setQuestionValue] = useState("");
  const [answer1Value, setAnswer1Value] = useState("");
  const [answer2Value, setAnswer2Value] = useState("");

  // firestoreから取得したuser情報を入れるステート
  const [users, setUsers] = useState("");

  // AuthProviderからauthUserステートを受け取っている
  const authUser = useContext(AuthContext);

  // ログイン状態によってButtonを制御
  // const disabled = authUser ? false : true;

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
            docId: doc.id,
          };
        });
        setUsers(getUsers);
      });
  }, [authUser]);

  const addVoting = (e) => {
    e.preventDefault();

    let values = [
      { value: questionValue, string: "質問内容" },
      { value: answer1Value, string: "選択肢1" },
      { value: answer2Value, string: "選択肢2" },
    ];

    values.map((value) => {
      let valueReplace = value.value.replace(/\s+/g, "");
      if (valueReplace === "") {
        alert(`${value.string}を入力してください。`);
        return;
      }
      console.log(value);
    });

    if (questionValue !== "" && answer1Value !== "" && answer2Value !== "") {
      firebase.firestore().collection("questions").add({
        question: questionValue,
        answer1: answer1Value,
        answer2: answer2Value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), //<-new Date()だとそのパソコンの時刻が使われるのでズレる場合を考慮してサーバーサイドの時刻を追加する
        username: users[0].username,
      });
      // 空にしなくてもいい？試してみる
      setQuestionValue("");
      setAnswer1Value("");
      setAnswer2Value("");

      history.push("/");
    }

    // console.log(answer1Value);
    // console.log(answer2Value);
  };

  // console.log(authUser);

  // console.log(answer1Value);
  // console.log(answer2Value);

  return (
    <>
      <h1>投票を作成</h1>
      <form onSubmit={addVoting}>
        <input
          type="text"
          value={questionValue}
          placeholder="質問内容を入力"
          onChange={(e) => setQuestionValue(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={answer1Value}
          placeholder="1.選択肢を入力"
          onChange={(e) => setAnswer1Value(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={answer2Value}
          placeholder="2.選択肢を入力"
          onChange={(e) => setAnswer2Value(e.target.value)}
        />
        <br></br>
        <button type="submit">送信</button>
      </form>
      <button onClick={() => history.push("/")}>キャンセル</button>
    </>
  );
};

export default CreateVoting;
