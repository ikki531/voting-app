import React from "react";
import Main from "./pages/Main";

// styled-componentsのreset.css
import { Reset } from "styled-reset";

const App = () => {
  return (
    <>
      <Reset />
      <h1>Voting App</h1>
      <Main />
    </>
  );
};

export default App;
