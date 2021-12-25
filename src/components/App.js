import React, { createContext, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import { HashRouter, Route } from "react-router-dom";
import MusicPlay from "../routes/MusicPlay";
import MusicList from "../routes/MusicList";

export const LoadingContext = React.createContext();

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <GlobalStyles />
        <HashRouter>
          <Route path="/" exact component={MusicList} />
          <Route path="/play" component={MusicPlay} />
        </HashRouter>
      </LoadingContext.Provider>
    </>
  );
};

export default App;
