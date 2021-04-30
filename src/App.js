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
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
