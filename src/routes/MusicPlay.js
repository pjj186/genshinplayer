import React from "react";
import styled from "styled-components";
import BackwardButton from "../components/common/BackwardButton";
import ForwardButton from "../components/common/ForwardButton";
import PlayButton from "../components/common/PlayButton";
import Avatar from "../components/common/Avatar";
import SongInfo from "../components/common/SongInfo";

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

const MusicPlay = () => {
  return (
    <>
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

export default MusicPlay;
