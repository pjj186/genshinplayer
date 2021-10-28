import React from "react";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import BackwardButton from "./common/BackwardButton";
import ForwardButton from "./common/ForwardButton";
import PlayButton from "./common/PlayButton";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <PlayButton />
      <ForwardButton />
      <BackwardButton />
    </>
  );
};

export default App;
