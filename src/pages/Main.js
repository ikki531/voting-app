import React, { useContext } from "react";
import VotesList from "./components/VotesList";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthProvider";
import { Route } from "react-router-dom";
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

  // console.log(user.displayName);
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />

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
