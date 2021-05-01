import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import firebase from "../../config/firebase";
import CountVotes from "./CountVotes";

const VotesList = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const questions = snapshot.docs.map((doc) => {
          return {
            username: doc.data().username,
            question: doc.data().question,
            answer1: doc.data().answer1,
            answer1Id: doc.data().answer1Id,
            answer2: doc.data().answer2,
            answer2Id: doc.data().answer2Id,
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
      <ul>
        {questions?.map((question) => {
          return <CountVotes question={question} key={question.docid} />;
        })}
      </ul>
    </>
  );
};

export default VotesList;
