import firebase from "../config/firebase";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
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
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="メールアドレス"
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
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="パスワード"
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
        </div>
        <button type="submit">ログイン</button>
      </form>
      <Link to="/signup">新規登録ページ</Link>
    </>
  );
};

export default Login;
