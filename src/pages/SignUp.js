import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  MenuItem,
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  Box,
} from "@material-ui/core";
import CopyRight from "../CopyRight";

const SignUp = () => {
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

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const signUpCheck = () => {
    history.push({ pathname: "./signup/check", state: getValues() });
  };

  // material-ui Selectの選択肢
  const genders = [
    {
      value: "男性",
      label: "男性",
    },
    {
      value: "女性",
      label: "女性",
    },
    {
      value: "その他",
      label: "その他",
    },
  ];
  // Select関連
  const [gender, setGender] = React.useState("");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(signUpCheck)}>
          <TextField
            margin="normal"
            // required
            fullWidth
            id="username"
            label="ユーザー名"
            variant="outlined"
            name="username"
            type="username"
            autoFocus
            {...register("username", {
              required: "ユーザー名を入力してください",
            })}
          />
          {errors.username && (
            <span style={{ fontWeight: "bold", color: "red" }}>
              ※{errors.username.message}
            </span>
          )}

          <TextField
            margin="normal"
            // required
            fullWidth
            id="email"
            label="メールアドレス"
            variant="outlined"
            name="email"
            type="email"
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
            name="password"
            type="password"
            {...register("password", {
              required: "パスワードを入力してください",
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

          <TextField
            margin="normal"
            // required
            fullWidth
            id="birthday"
            label="生年月日"
            variant="outlined"
            name="birthday"
            type="birthday"
            autoFocus
            {...register("birthday", {
              required: "生年月日を入力してください",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "半角数字8文字で入力してください",
              },
            })}
          />
          {errors.birthday && (
            <span style={{ fontWeight: "bold", color: "red" }}>
              ※{errors.birthday.message}
            </span>
          )}

          <TextField
            margin="normal"
            // required
            fullWidth
            {...register("gender", {
              required: "性別を選択してください",
              pattern: {
                message: "性別を選択してください",
              },
            })}
            id="outlined-select-currency"
            select
            label="性別"
            value={gender}
            onChange={handleChange}
            helperText="性別を選択してください"
            variant="outlined"
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {errors.gender && (
            <span style={{ fontWeight: "bold", color: "red" }}>
              ※{errors.gender.message}
            </span>
          )}
          <Button
            fullWidth
            className={classes.submit}
            variant="outlined"
            color="primary"
            type="submit"
          >
            確認画面
          </Button>
        </form>
        <br></br>
        <Link to="/login">ログインページ</Link>
      </div>
      <Box mt={8}>
        <CopyRight />
      </Box>
    </Container>
  );
};

export default SignUp;
