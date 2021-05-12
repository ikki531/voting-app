import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import firebase from "../../config/firebase";

const CountVotes = ({ question }) => {
  const authUser = useContext(AuthContext);
  // firestoreから取得したuser情報を入れるステート
  const [users, setUsers] = useState(false);
  // users && console.log(users[0].id);
  // ログインしていればemailを取得
  const email = authUser && authUser.email;
  // console.log(authUser[0]);

  // ログイン状態によってButtonを制御
  const disabled = authUser ? false : true;

  //票数を入れるstate(counter.lengthで票数を表示)
  const [countAnswer1, setCountAnswer1] = useState([]);
  const [countAnswer2, setCountAnswer2] = useState([]);

  // 現在どちらに投票しているか分かるようにする
  // （ログイン中のuserが投票しているbuttonに色を付ける）
  const [colorButton1, setColorButton1] = useState(false);
  const [colorButton2, setColorButton2] = useState(false);
  // ログインしていればidを取得
  // users[0]の直後の"？."がないと、新規登録後エラーになる。
  // usersにデータが入る前に画面がレンダリングされる事によるエラー。
  // オプショナルチェイニング演算子"?."を使うことで、エラーとなるのではなく、undefinedを返してくれるようになる。
  const usersId = authUser && users[0]?.id;

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
          return doc.data();
        });
        // console.log(countAnswer1);
        setCountAnswer1(voteCountAnswer1);
        // console.log("2.answer1:" + countAnswer1);

        // ログイン中のusers.idと等しいusers.idが各質問のanswer1にあるか判別
        voteCountAnswer1.forEach(function (item1) {
          // console.log(Object.values(item1));
          const test1 = Object.values(item1).includes(usersId);
          // console.log(test1);
          // console.log(colorButton1);
          test1 && setColorButton1(true);
          // console.log(colorButton1);
        });
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
          return doc.data();
        });
        setCountAnswer2(voteCountAnswer2);

        // ログイン中のusers.idと等しいusers.idが各質問のanswer2にあるか判別
        voteCountAnswer2.forEach(function (item2) {
          // console.log(Object.values(item2));
          const test2 = Object.values(item2).includes(usersId);
          // console.log(test2);
          // console.log(colorButton2);
          test2 && setColorButton2(true);
          // console.log(colorButton2);
        });
      });
  }, [colorButton1, colorButton2, email, question, usersId]);

  // 選択肢1に投票した場合
  const votingAnswer1 = () => {
    // 未投票ならば、
    if (colorButton1 === false && colorButton2 === false) {
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
      setColorButton1(true);
      // 選択肢1に投票している場合、dbの情報を消す
    } else if (colorButton1 === true && colorButton2 === false) {
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
      setColorButton1(false);
      // 選択肢2のみ投票されている場合
    } else {
      alert("一人一票です。");
    }
  };

  // 選択肢2に投票した場合
  const votingAnswer2 = () => {
    // 未投票ならば
    if (colorButton1 === false && colorButton2 === false) {
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
      setColorButton2(true);
      // 選択肢2に投票している場合、dbの情報を消す
    } else if ((colorButton1 === false && colorButton2) === true) {
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
      setColorButton2(false);
      // 選択肢1のみ投票されている場合
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
      {colorButton1 ? (
        <button
          disabled={disabled}
          onClick={votingAnswer1}
          style={{ color: "red" }}
        >
          {question.answer1}
          <span>{countAnswer1.length}</span>
        </button>
      ) : (
        <button disabled={disabled} onClick={votingAnswer1}>
          {question.answer1}
          <span>{countAnswer1.length}</span>
        </button>
      )}
      {colorButton2 ? (
        <button
          disabled={disabled}
          onClick={votingAnswer2}
          style={{ color: "red" }}
        >
          {question.answer2}
          <span>{countAnswer2.length}</span>
        </button>
      ) : (
        <button disabled={disabled} onClick={votingAnswer2}>
          {question.answer2}
          <span>{countAnswer2.length}</span>
        </button>
      )}
    </li>
  );
};

export default CountVotes;
