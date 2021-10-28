import React from "react";
import styled from "styled-components";
import BackwardButton from "./components/BackwardButton";
import ForwardButton from "./components/ForwardButton";
import PlayButton from "./components/PlayButton";

const App = () => {
  return (
    <>
      <PlayButton />
      <ForwardButton />
      <BackwardButton />
    </>
  );
};

export default App;
