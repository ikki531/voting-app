import React, { useContext } from "react";
// import { useState, useEffect } from "react";
import VotesList from "./components/VotesList";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthProvider";
import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import {
  Button,
  makeStyles,
  Box,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import CopyRight from "../CopyRight";

const Main = ({ history }) => {
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
      width: "100%",
      marginTop: theme.spacing(8),
    },
    login: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const authUser = useContext(AuthContext);

  const loginAlert = () => {
    alert("ログインしてください。");
  };
  //////////////////////////////////////////////////////////////////////
  ///// React Router試し用 /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  // const [users, setUsers] = useState(null);
  // console.log(users);

  // usersコレクションの中身を全て取得してsetUsersに格納しています
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .onSnapshot((snapshot) => {
  //       const users = snapshot.docs.map((doc) => {
  //         return doc.data();
  //       });

  //       setUsers(users);
  //     });
  // }, []);

  // console.log(users);
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {/* //////////////////////////////////////////////////////////////////////
        ///// React Router試し用 /////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////// */}
        {/* <button onClick={() => history.push("/userinfo")}>マイページ</button>
        <br></br> */}
        {/* <button onClick={() => history.push("/otheruserinfo")}>
          他の人のページ
        </button>
        {/* users配列の中身の数だけ<Link>を生成しています */}
        {/* {users?.map((user) => (
          <> */}
        {/* 説明②Routerのpathで'/users:id'の:idの部分はどんな文字列が渡ってきても<UserSecond/>に遷移と書いてあります。
                     ${user.id}の部分にはfirestoreのusersコレクションから取得したidを渡しています
                     例として上記のIDを渡して<UserInfoSecond/>のコンポーネントに遷移した際に,
                     localhost:3000/userinfo/AgoxL9Vtt1MJum4m ← この最後の/以降の文字列が渡したIDの部分
                     といったURLに変化します */}

        {/* 以降の説明はUserInfoSecondへ */}
        {/* <Link to={`userinfo/${user.id}`}>{user.username}</Link>
            <br></br>
          </>
        ))} */}
        {/* ////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////// */}
        <div className={classes.paper}>
          <div>
            <Typography component="h1" variant="h3">
              みんなが気になること♪
            </Typography>
            <div className={classes.login}>
              <Route
                render={() =>
                  authUser ? (
                    <Button
                      // fullWidth
                      variant="outlined"
                      color="secondary"
                      onClick={() => firebase.auth().signOut()}
                    >
                      ログアウト
                    </Button>
                  ) : (
                    <Button
                      // fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={() => history.push("/login")}
                    >
                      ログイン
                    </Button>
                  )
                }
              />
            </div>
          </div>

          <VotesList />

          <Route
            render={() =>
              authUser ? (
                <div className={classes.button}>
                  <Button
                    size="large"
                    fullWidth
                    variant="outlined"
                    onClick={() => history.push("/CreateVoting")}
                  >
                    投票を作成
                  </Button>
                </div>
              ) : (
                <div className={classes.button}>
                  <Button
                    size="large"
                    fullWidth
                    variant="outlined"
                    onClick={loginAlert}
                  >
                    投票を作成
                  </Button>
                </div>
              )
            }
          />
        </div>
        <Box mt={8} marginBottom="30px">
          <CopyRight />
        </Box>
      </Container>
    </>
  );
};

export default Main;
