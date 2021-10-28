import React from "react";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import BackwardButton from "./common/BackwardButton";
import ForwardButton from "./common/ForwardButton";
import PlayButton from "./common/PlayButton";
import Avatar from "./common/Avatar";

const AppContainer = styled.div`
  display: flex;
`;

const Player = styled.div`
  display: flex;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: wheat;
  width: 350px;
  height: 600px;
  border-radius: 30px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Player>
          <Avatar />
        </Player>
      </AppContainer>
    </>
  );
};

export default App;
