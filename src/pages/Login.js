import firebase from "../config/firebase";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const Login = () => {
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
  }));

  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const history = useHistory();

  async function setdata() {
    return getValues();
  }

  async function login() {
    const userdata = await setdata();
    firebase
      .auth()
      .signInWithEmailAndPassword(userdata.email, userdata.password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        alert("E-mailまたはPasswordが違います。");
        console.log(err);
      });
  }

  const handleLogin = () => {
    login();
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
            <TextField
              margin="normal"
              // required
              fullWidth
              id="email"
              label="メールアドレス"
              variant="outlined"
              type="email"
              name="email"
              autoFocus
              {...register("email", {
                required: "メールアドレスを入力してください",
                pattern: {
                  value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "正しいメールアドレスを入力してください",
                },
              })}
            />
            {errors.email && (
              <span style={{ fontWeight: "bold", color: "red" }}>
                ※{errors.email.message}
              </span>
            )}
            <TextField
              margin="normal"
              // required
              fullWidth
              id="password"
              label="パスワード"
              variant="outlined"
              type="password"
              name="password"
              {...register("password", {
                required: "パスワードを入力してください。",
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                  message:
                    "パスワードは英字1文字以上、数字1文字以上を含む8文字以上の半角英数字を入力してください",
                },
              })}
            />
            {errors.password && (
              <span style={{ fontWeight: "bold", color: "red" }}>
                ※{errors.password.message}
              </span>
            )}
            <Button
              fullWidth
              className={classes.submit}
              variant="outlined"
              color="primary"
              type="submit"
            >
              ログイン
            </Button>
          </form>
          <br></br>
          <Link to="/signup">新規登録ページ</Link>
        </div>
        <Box mt={8}>
          <CopyRight />
        </Box>
      </Container>
    </>
  );
};

export default Login;
