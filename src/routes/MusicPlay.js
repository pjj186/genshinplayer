import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import BackwardButton from "../components/common/BackwardButton";
import ForwardButton from "../components/common/ForwardButton";
import PlayButton from "../components/common/PlayButton";
import Avatar from "../components/common/Avatar";
import SongController from "../components/common/SongController";
import SongTitle from "../components/common/SongTitle";
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
  width: 300px;
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

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

const MUSIC_LF = "currentmusic";

const MusicPlay = (props) => {
  let volumeValue = 0.5; // 볼륨 초깃값
  const videoRef = useRef();
  const volumeRef = useRef();
  const [srcValue, setSrcValue] = useState("");
  const [volumeBar, setVolumeBar] = useState(0.5);
  const [duration, setDuration] = useState(0);

  const getLocalForage = () => {
    localforage.getItem(MUSIC_LF, (err, value) => {
      if (err) {
        console.log(err);
      }
      setDuration(value.duration);
    });
  };

  const playMusic = () => {
    // 음악 재생
    localforage.getItem(MUSIC_LF, (err, value) => {
      if (err) {
        console.log(err);
      }
      const url = URL.createObjectURL(value.file); // 파일
      setSrcValue(url);
    });
    videoRef.current.volume = volumeValue;
  };

  const handleVolumeChange = (event) => {
    const {
      target: { value },
    } = event;
    setVolumeBar(value);
    volumeValue = value;
    videoRef.current.volume = value;
  };

  useEffect(() => {
    volumeRef.current.addEventListener("input", handleVolumeChange);
    getLocalForage();
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
          <SongTitle>
            <Title>{props.location.state.name}</Title>
            {props.location.state.videoLength}
          </SongTitle>
          <SongController>
            <input
              type="range"
              step="0.1"
              value={volumeBar}
              min="0"
              max="1"
              ref={volumeRef}
              onChange={handleVolumeChange}
            />
            {Math.floor(duration / 60)} : {Math.floor(duration % 60)}
            <Video src={srcValue} autoPlay={true} ref={videoRef} />
          </SongController>
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
