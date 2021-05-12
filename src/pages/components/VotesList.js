import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import CountVotes from "./CountVotes";

const VotesList = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    let disposed = false;
    const dispose = () => {
      disposed = true;
    };
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
            docid: doc.id, //<- keyを設定するためにidを取得、あとで削除機能等をつける
          };
        });
        !disposed && setQuestions(questions);
      });
    return dispose;
  }, []);

  return (
    <>
      <div>
        <ul>
          {questions?.map((question) => {
            return <CountVotes question={question} key={question.docid} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default VotesList;
