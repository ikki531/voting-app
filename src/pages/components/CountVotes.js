import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import firebase from "../../config/firebase";

const CountVotes = ({ question }) => {
  const authUser = useContext(AuthContext);
  // firestoreから取得したuser情報を入れるステート
  const [users, setUsers] = useState([
    {
      birthday: "",
      email: "",
      gender: "",
      id: "",
      username: "",
    },
  ]);
  // ログインしていればemailを取得
  const email = authUser && authUser.email;

  // ログイン状態によってButtonを制御
  const disabled = authUser ? false : true;

  //票数を入れるstate(counter.lengthで票数を表示)
  const [countAnswer1, setCountAnswer1] = useState([]);
  const [countAnswer2, setCountAnswer2] = useState([]);

  useEffect(() => {
    // ログイン中のユーザー情報を取得
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

    // answer1に入った票を集計
    firebase
      .firestore()
      .collection("questions")
      .doc(question.docid)
      .collection("answer1")
      .doc(question.answer1Id)
      .collection("vote")
      .onSnapshot((snap) => {
        const voteCountAnswer1 = snap.docs.map((doc) => {
          return doc.data;
        });
        setCountAnswer1(voteCountAnswer1);
      });

    // answer2に入った票を集計
    firebase
      .firestore()
      .collection("questions")
      .doc(question.docid)
      .collection("answer2")
      .doc(question.answer2Id)
      .collection("vote")
      .onSnapshot((snap) => {
        const voteCountAnswer2 = snap.docs.map((doc) => {
          return doc.data;
        });
        setCountAnswer2(voteCountAnswer2);
      });
  }, [email, question]);

  // 投票済みかどうかの確認
  const [vote1, setVote1] = useState(false);
  const [vote2, setVote2] = useState(false);

  // 選択肢1に投票した場合
  const votingAnswer1 = () => {
    // 未投票ならば、
    if (vote1 === false && vote2 === false) {
      //   console.log(`${users[0].id},${question.docid}`);
      // dbのquestionsにuser情報を入れる(この中を数えて票数を数える)
      firebase
        .firestore()
        .collection("questions")
        .doc(question.docid)
        .collection("answer1")
        .doc(question.answer1Id)
        .collection("vote")
        .doc(users[0].id)
        .set({
          usersid: users[0].id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      // dbのusersにquestions情報を入れる(ユーザーが回答したquestionが分かる)
      firebase
        .firestore()
        .collection("users")
        .doc(users[0].docid)
        .collection("voteQuestion")
        .doc(question.docid)
        .collection("answer1")
        .doc(question.answer1Id)
        .set({
          quesrionid: question.docid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setVote1(true);
      // 選択肢1に投票している場合、dbの情報を消す
    } else if (vote1 === true && vote2 === false) {
      firebase
        .firestore()
        .collection("questions")
        .doc(question.docid)
        .collection("answer1")
        .doc(question.answer1Id)
        .collection("vote")
        .doc(users[0].id)
        .delete()
        .then(() => {
          console.log("Deleted!");
        })
        .catch((error) => {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(users[0].docid)
        .collection("voteQuestion")
        .doc(question.docid)
        .collection("answer1")
        .doc(question.answer1Id)
        .delete()
        .then(() => {
          console.log("Deleted!");
        })
        .catch((error) => {
          console.log(error);
        });
      setVote1(false);
      // vote2のみ投票されている場合
    } else {
      alert("一人一票です。");
    }
  };

  // 選択肢2に投票した場合
  const votingAnswer2 = () => {
    // 未投票ならば
    if (vote1 === false && vote2 === false) {
      //   console.log(`${users[0].id},${question.docid}`);
      // dbのquestionsにuser情報を入れる(この中を数えて票数を数える)
      firebase
        .firestore()
        .collection("questions")
        .doc(question.docid)
        .collection("answer2")
        .doc(question.answer2Id)
        .collection("vote")
        .doc(users[0].id)
        .set({
          usersid: users[0].id,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      // dbのusersにquestions情報を入れる(ユーザーが回答したquestionが分かる)
      firebase
        .firestore()
        .collection("users")
        .doc(users[0].docid)
        .collection("voteQuestion")
        .doc(question.docid)
        .collection("answer2")
        .doc(question.answer2Id)
        .set({
          quesrionid: question.docid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setVote2(true);
      // 選択肢2に投票している場合、dbの情報を消す
    } else if ((vote1 === false && vote2) === true) {
      firebase
        .firestore()
        .collection("questions")
        .doc(question.docid)
        .collection("answer2")
        .doc(question.answer2Id)
        .collection("vote")
        .doc(users[0].id)
        .delete()
        .then(() => {
          console.log("Deleted!");
        })
        .catch((error) => {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(users[0].docid)
        .collection("voteQuestion")
        .doc(question.docid)
        .collection("answer2")
        .doc(question.answer2Id)
        .delete()
        .then(() => {
          console.log("Deleted!");
        })
        .catch((error) => {
          console.log(error);
        });
      setVote2(false);
      // vote1のみ投票されている場合
    } else {
      alert("一人一票です。");
    }
  };

  return (
    <li key={question.docid}>
      <br></br>
      <h2 style={{ color: "green" }}>
        　{question.username}　さんからみんなに質問
      </h2>
      <span>{question.question}</span>
      <button disabled={disabled} onClick={votingAnswer1}>
        {question.answer1}
        <span>{countAnswer1.length}</span>
      </button>
      <button disabled={disabled} onClick={votingAnswer2}>
        {question.answer2}
        <span>{countAnswer2.length}</span>
      </button>
    </li>
  );
};

export default CountVotes;
