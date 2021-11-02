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

const VolumeBox = styled.input``;

const TimeLineBox = styled.input``;

const TotalTimeBox = styled.span``;

const CurrentTimeBox = styled.span``;

const MUSIC_LF = "currentmusic";

const MusicPlay = (props) => {
  let volumeValue = 0.5; // 볼륨 초깃값

  const videoRef = useRef();
  const volumeRef = useRef();
  const currentTime = useRef();
  const totalTime = useRef();
  const timelineel = useRef();

  const [srcValue, setSrcValue] = useState("");
  const [volumeBar, setVolumeBar] = useState(0.5);
  const [timeline, setTimeline] = useState(0);
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

  const handleTimeUpdate = () => {
    currentTime.current.innerText = Math.floor(videoRef.current.currentTime);
    setTimeline(Math.floor(videoRef.current.currentTime));
  };

  const handleTimelineChange = (event) => {
    const {
      target: { value },
    } = event;
    videoRef.current.currentTime = value;
  };

  useEffect(() => {
    const video = videoRef.current;
    volumeRef.current.addEventListener("input", handleVolumeChange);
    video.addEventListener("timeupdate", handleTimeUpdate);
    getLocalForage();
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
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
            <VolumeBox
              type="range"
              step="0.1"
              value={volumeBar}
              min="0"
              max="1"
              ref={volumeRef}
              onChange={handleVolumeChange}
            />
            <TimeLineBox
              type="range"
              step="1"
              value={timeline}
              min="0"
              ref={timelineel}
              onChange={handleTimelineChange}
            />
            <CurrentTimeBox ref={currentTime}>00 : 00</CurrentTimeBox>
            <TotalTimeBox ref={totalTime}>
              {Math.floor(duration / 60)} : {Math.floor(duration % 60)}
            </TotalTimeBox>
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
