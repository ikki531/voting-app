import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpCheck from "./pages/SignUpCheck";
import AddPuestion from "./pages/AddQuestion";
import LoggedInRoute from "./LoggedInRoute";

// styled-componentsのreset.css
import { Reset } from "styled-reset";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./AuthService";

const App = () => {
  return (
    <>
      <Reset />
      <AuthProvider>
        <Router>
          <Switch>
            <LoggedInRoute exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signupcheck" component={SignUpCheck} />
            <Route exact path="/addquestion" component={AddPuestion} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
