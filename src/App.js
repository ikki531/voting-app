import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpCheck from "./pages/SignUpCheck";
import CreateVoting from "./pages/CreateVoting";

// styled-componentsのreset.css
import { Reset } from "styled-reset";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import MyPage from "./pages/components/userinfo/MyPage";
import OtherUserInfo from "./pages/components/userinfo/OtherUserInfo";

const App = () => {
  return (
    <>
      <Reset />
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signup/check" component={SignUpCheck} />
            <Route exact path="/CreateVoting" component={CreateVoting} />
            {/* //////////////////////////////////////////////////////////////////////
            ///// React Router試し用 /////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////// */}
            {/* 説明①この書き方はpath='/userinfo'をベースにレンダリングを分岐させる書き方になっています。
                     renderにはpropsが自動で渡ってきているのでpropsの中の様々なプロパティの中のmatchを取り出し、
                     さらにmatchの中のurlを取り出すという書き方になっています。
                     urlの中身には/'userinfo'が入ってます */}
            {/* <Route
              path="/userinfo"
              render={({ match: { url } }) => (
                <Switch> */}
            {/* pathが'/userinfo'(後ろの/はあってもなくてもOK)ならuserinfoへ遷移) */}
            {/* <Route exact path={`${url}/`}>
                    <MyPage />
                  </Route> */}

            {/* pathが'/userinfo'(/:idの部分はどんな文字列が渡ってきてもUserSecondに遷移) */}
            {/* <Route path={`${url}/:id`}>
                    <OtherUserInfo />
                  </Route>
                </Switch>
              )}
            /> */}
            {/* ////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////// */}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
