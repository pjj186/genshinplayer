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

const Video = styled.video`
  display: none;
`;

const MUSIC_LF = "currentmusic";

const MusicPlay = (props) => {
  let volumeValue = 0.5;
  const videoRef = useRef();
  const volumeRef = useRef();
  const [srcValue, setSrcValue] = useState("");
  const [volumeBar, setVolumeBar] = useState(0.5);

  const playMusic = () => {
    // 음악 재생
    localforage.getItem(MUSIC_LF, (err, value) => {
      if (err) {
        console.log(err);
      }
      console.log(value.name);
      const url = URL.createObjectURL(value.file);
      setSrcValue(url); // 이때 비디오가 생긴단 말이지?
    });
    videoRef.current.volume = volumeValue;
    console.log(videoRef.current.volume);
  };

  const handleVolumeChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setVolumeBar(value);
    volumeValue = value;
    videoRef.current.volume = value;
  };

  useEffect(() => {
    volumeRef.current.addEventListener("input", handleVolumeChange);
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
            <input
              type="range"
              step="0.1"
              value={volumeBar}
              min="0"
              max="1"
              ref={volumeRef}
              onChange={handleVolumeChange}
            />
            <Video src={srcValue} autoPlay={true} ref={videoRef} />
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
