import React from "react";
import styled from "styled-components";
import BackwardButton from "../components/common/BackwardButton";
import ForwardButton from "../components/common/ForwardButton";
import PlayButton from "../components/common/PlayButton";
import Avatar from "../components/common/Avatar";
import SongInfo from "../components/common/SongInfo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: wheat;
  width: 350px;
  height: 500px;
  border-radius: 15px;
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
  border-radius: 0px 0px 15px 15px;
`;

const BackLink = styled(Link)`
  font-size: 30px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const MusicPlay = () => {
  return (
    <>
      <Container>
        <Player>
          <BackLink to="/">
            <FontAwesomeIcon icon={faCaretSquareLeft} />
          </BackLink>
          <Avatar />
          <SongInfo />
          <ButtonContainer>
            <BackwardButton />
            <PlayButton />
            <ForwardButton />
          </ButtonContainer>
        </Player>
      </Container>
    </>
  );
};

export default MusicPlay;
