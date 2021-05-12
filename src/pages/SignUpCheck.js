import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../config/firebase";
import { nanoid } from "nanoid";
import {
  Button,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Box,
} from "@material-ui/core";
import CopyRight from "../CopyRight";

const SignUpCheck = () => {
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
    checkList: {
      width: "100%",
      textAlign: "center",
    },
    checkItem: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setEmail(history.location.state.email);
    setPassword(history.location.state.password);
    setUserData({
      id: nanoid(),
      username: history.location.state.username,
      email: history.location.state.email,
      birthday: history.location.state.birthday,
      gender: history.location.state.gender,
    });
  }, [history]);

  async function authsubmit() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
      });
    return userData;
  }

  async function dbsubmit() {
    const setdata = await authsubmit();
    firebase
      .firestore()
      .collection("users")
      .add(setdata)
      .then(() => {
        history.push("/");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dbsubmit();
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            確認画面
          </Typography>
          <div className={classes.form}>
            <div className={classes.checkList}>
              <p className={classes.checkItem}>ユーザー名</p>
              <p className={classes.checkItem} style={{ color: "blue" }}>
                {history.location.state.username}
              </p>
              <p className={classes.checkItem}>メールアドレス</p>
              <p className={classes.checkItem} style={{ color: "blue" }}>
                {history.location.state.email}
              </p>
              <p className={classes.checkItem}>パスワード</p>
              <p className={classes.checkItem} style={{ color: "blue" }}>
                {history.location.state.password}
              </p>
              <p className={classes.checkItem}>生年月日</p>
              <p className={classes.checkItem} style={{ color: "blue" }}>
                {history.location.state.birthday}
              </p>
              <p className={classes.checkItem}>性別</p>
              <p className={classes.checkItem} style={{ color: "blue" }}>
                {history.location.state.gender}
              </p>
            </div>
            <Button
              fullWidth
              className={classes.submit}
              variant="outlined"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              登録
            </Button>
          </div>
        </div>
        <Box mt={8}>
          <CopyRight />
        </Box>
      </Container>
    </>
  );
};

export default SignUpCheck;
