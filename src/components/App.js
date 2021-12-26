import React from "react";
import GlobalStyles from "./GlobalStyles";
import { HashRouter, Route } from "react-router-dom";
import MusicPlay from "../routes/MusicPlay";
import MusicList from "../routes/MusicList";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <HashRouter>
        <Route path="/" exact component={MusicList} />
        <Route path="/play" component={MusicPlay} />
      </HashRouter>
    </>
  );
};

export default App;
