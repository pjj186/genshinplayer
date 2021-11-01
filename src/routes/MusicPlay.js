import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import BackwardButton from "../components/common/BackwardButton";
import ForwardButton from "../components/common/ForwardButton";
import PlayButton from "../components/common/PlayButton";
import Avatar from "../components/common/Avatar";
import SongInfo from "../components/common/SongInfo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import localforage from "localforage";
import Header from "../components/common/Header";

const Container = styled.div`
  display: flex;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: white;
  width: 350px;
  height: 500px;
  border-radius: 15px;
  border: 1px solid black;
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
  margin-left: 5px;
  font-size: 20px;
`;
const MUSIC_LF = "currentmusic";

const MusicPlay = (props) => {
  const videoRef = useRef();
  const [srcValue, setSrcValue] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const playMusic = () => {
    // 음악 재생
    localforage.getItem(MUSIC_LF, (err, value) => {
      if (err) {
        console.log(err);
      }
      console.log(value.name);
      const url = URL.createObjectURL(value.file);
      setSrcValue(url);
    });
  };

  const getDurations = () => {
    setMinute(Math.floor(videoRef.current.duration / 60));
    setSecond(Math.floor(videoRef.current.duration % 60));
  };

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", getDurations);
  }, []);

  return (
    <>
      <Container>
        <Player>
          <Header>
            <BackLink to="/">
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </BackLink>
          </Header>
          <Avatar imgSrc={props.location.state.imgSrc} />
          <SongInfo>
            <video src={srcValue} autoPlay={true} ref={videoRef} />
          </SongInfo>
          <ButtonContainer>
            <BackwardButton />
            <PlayButton playMusic={playMusic} />
            <ForwardButton />
          </ButtonContainer>
        </Player>
      </Container>
    </>
  );
};

export default MusicPlay;
