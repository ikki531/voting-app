import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import firebase from "../config/firebase";
import { nanoid } from "nanoid";
import {
  Button,
  TextField,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Box,
} from "@material-ui/core";
import CopyRight from "../CopyRight";

const CreateVoting = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    button: {
      width: "110%",
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonL: {
      width: "100%",
    },
    buttonR: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  const [questionValue, setQuestionValue] = useState("");
  const [answer1Value, setAnswer1Value] = useState("");
  const [answer2Value, setAnswer2Value] = useState("");

  // firestoreから取得したuser情報を入れるステート
  const [users, setUsers] = useState("");

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

  const addVoting = (e) => {
    e.preventDefault();

    let values = [
      { value: questionValue, string: "質問内容" },
      { value: answer1Value, string: "選択肢①" },
      { value: answer2Value, string: "選択肢②" },
    ];

    values.map((value) => {
      let valueReplace = value.value.replace(/\s+/g, "");
      if (valueReplace === "") {
        return alert(`${value.string}を入力してください。`);
      }
      return console.log(value);
    });

    if (questionValue !== "" && answer1Value !== "" && answer2Value !== "") {
      firebase.firestore().collection("questions").add({
        question: questionValue,
        answer1: answer1Value,
        answer1Id: nanoid(),
        answer2: answer2Value,
        answer2Id: nanoid(),
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
      <Container component="main" maxWidth="sm">
        <CssBaseline />

        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            投票を作成
          </Typography>
          <form onSubmit={addVoting}>
            <TextField
              id="question"
              label="質問内容を入力"
              name="question"
              type="text"
              value={questionValue}
              onChange={(e) => setQuestionValue(e.target.value)}
            />
            <br></br>
            <TextField
              id="answer1"
              label="1. 選択肢①を入力"
              name="answer1"
              type="text"
              value={answer1Value}
              onChange={(e) => setAnswer1Value(e.target.value)}
            />
            <br></br>
            <TextField
              id="answer2"
              label="2. 選択肢②を入力"
              name="answer2"
              type="text"
              value={answer2Value}
              onChange={(e) => setAnswer2Value(e.target.value)}
            />
            <br></br>
            <div className={classes.button}>
              <div className={classes.buttonL}>
                <Button variant="outlined" color="primary" type="submit">
                  　送信　
                </Button>
              </div>
              <div className={classes.buttonR}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => history.push("/")}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          </form>
        </div>
        <Box mt={8} marginBottom="30px">
          <CopyRight />
        </Box>
      </Container>
    </>
  );
};

export default CreateVoting;
