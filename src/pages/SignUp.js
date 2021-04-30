import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
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

  return (
    <div>
      <h1>新規登録</h1>

      <form onSubmit={handleSubmit(signUpCheck)}>
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input
            name="username"
            type="username"
            id="username"
            placeholder="ユーザー名"
            {...register("username", {
              required: "ユーザー名を入力してください",
            })}
          />
          {errors.username && (
            <span style={{ fontWeight: "bold", color: "red" }}>
              ※{errors.username.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            name="email"
            type="email"
            id="email"
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
            name="password"
            type="password"
            id="password"
            placeholder="パスワード"
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
        </div>

        <div>
          <label>生年月日</label>
          <input
            type="text"
            placeholder="生年月日"
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
        </div>

        <div>
          <label>性別</label>
          <select
            {...register("gender", {
              required: "性別を選択してください",
              pattern: {
                message: "性別を選択してください",
              },
            })}
          >
            <option value=""></option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
          {errors.gender && (
            <span style={{ fontWeight: "bold", color: "red" }}>
              ※{errors.gender.message}
            </span>
          )}
        </div>
        <button type="submit">確認画面</button>
      </form>
      <Link to="/login">ログインページ</Link>
    </div>
  );
};

export default SignUp;
