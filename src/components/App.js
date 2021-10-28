import React from "react";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import BackwardButton from "./common/BackwardButton";
import ForwardButton from "./common/ForwardButton";
import PlayButton from "./common/PlayButton";
import Avatar from "./common/Avatar";
import SongInfo from "./common/SongInfo";

const AppContainer = styled.div`
  display: flex;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: wheat;
  width: 350px;
  height: 500px;
  border-radius: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  background-color: black;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 0px 0px 30px 30px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Player>
          <Avatar />
          <SongInfo />
          <ButtonContainer>
            <BackwardButton />
            <PlayButton />
            <ForwardButton />
          </ButtonContainer>
        </Player>
      </AppContainer>
    </>
  );
};

export default App;
