import React from "react";
import GlobalStyles from "./GlobalStyles";
import { HashRouter, Route } from "react-router-dom";
import MusicPlay from "../routes/MusicPlay";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <HashRouter>
        <Route path="/" component={MusicPlay} />
      </HashRouter>
    </>
  );
};

export default App;
