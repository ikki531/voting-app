import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import firebase from "../../config/firebase";

const List = () => {
  // ログインしてるならボタン押せる機能実装時使う？
  const authUser = useContext(AuthContext);

  const [questions, setQuestions] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const questions = snapshot.docs.map((doc) => {
          return {
            question: doc.data().question,
            answer1: doc.data().answer1,
            answer2: doc.data().answer2,
            // timestamp: doc.data().timestamp.toDate(), //この部分でfirebaseより取得
            // timestamp: doc
            //   .data({ serverTimestamps: "estimate" })
            //   .timestamp.toDate(), //serverTimestampが作成途中の時は見積もり時間を返してくれる
            docid: doc.id, //<- keyを設定するためにidを所得　あとあと削除機能等をつけようと思った時にも便利
          };
        });
        setQuestions(questions);
      });
  }, []);

  return (
    <>
      <ol>
        {questions?.map((question) => {
          return (
            <li key={question.docid}>
              <span>{question.question}</span>
              <button>{question.answer1}</button>
              <button>{question.answer2}</button>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default List;
