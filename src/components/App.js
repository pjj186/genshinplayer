import React, { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import { HashRouter, Route } from "react-router-dom";
import MusicPlay from "../routes/MusicPlay";
import MusicList from "../routes/MusicList";

export const AppContext = React.createContext();

const App = () => {
  const [musicLF, setMusicLF] = useState(true);
  const [imageLF, setImageLF] = useState(true);
  const [bgLF, setBgLF] = useState(true);

  const [duration, setDuration] = useState(null);
  const [originduration, setOriginDuration] = useState(null);
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [bgSrc, setBgSrc] = useState(null);

  return (
    <>
      <AppContext.Provider
        value={{
          musicLF,
          imageLF,
          bgLF,
          setMusicLF,
          setImageLF,
          setBgLF,
          duration,
          setDuration,
          originduration,
          setOriginDuration,
          name,
          setName,
          bgSrc,
          setBgSrc,
          imgSrc,
          setImgSrc,
        }}
      >
        <GlobalStyles />
        <HashRouter>
          <Route path="/" exact component={MusicList} />
          <Route path="/play" component={MusicPlay} />
        </HashRouter>
      </AppContext.Provider>
    </>
  );
};

export default App;
