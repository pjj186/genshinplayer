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
import {
  faChevronCircleLeft,
  faVolumeUp,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
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
  background-color: black;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-evenly;
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
  font-weight: 600;
`;

const VolumeGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const VolumeBox = styled.input`
  width: 70%;
  margin: 0 5px;
`;

const TimeLineBox = styled.input`
  width: 100%;
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

const TimeLineGroup = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 10px;
`;

const TotalTimeBox = styled.span`
  font-weight: bold;
`;

const CurrentTimeBox = styled.span`
  font-weight: bold;
`;

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
  const [duration, setDuration] = useState(null);
  const [originduration, setOriginDuration] = useState(null);

  const getLocalForage = () => {
    localforage.getItem(MUSIC_LF, (err, value) => {
      if (err) {
        console.log(err);
      }
      setDuration(timeFormat(value.duration));
      setOriginDuration(value.duration);
    });
  };

  const playMusic = () => {
    // 음악 재생
    if (videoRef.current.currentTime === 0) {
      localforage.getItem(MUSIC_LF, (err, value) => {
        if (err) {
          console.log(err);
        }
        const url = URL.createObjectURL(value.file); // 파일
        setSrcValue(url);
      });
    } else {
      videoRef.current.play();
    }
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
    currentTime.current.innerText = timeFormat(
      Math.floor(videoRef.current.currentTime)
    );
    setTimeline(Math.floor(videoRef.current.currentTime));
  };

  const handleTimelineChange = (event) => {
    const {
      target: { value },
    } = event;
    videoRef.current.currentTime = value;
  };

  const timeFormat = (seconds) => {
    // 시간 형식을 포맷하는 함수
    return new Date(seconds * 1000).toISOString().substr(15, 4);
  };

  useEffect(() => {
    const video = videoRef.current;
    const volume = volumeRef.current;
    volume.addEventListener("input", handleVolumeChange);
    video.addEventListener("timeupdate", handleTimeUpdate);
    getLocalForage();
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      volume.removeEventListener("input", handleVolumeChange);
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
            <TimeLineGroup>
              <TimeLineBox
                type="range"
                step="1"
                value={timeline}
                min="0"
                max={originduration}
                ref={timelineel}
                onChange={handleTimelineChange}
              />
              <TimeBox>
                <CurrentTimeBox ref={currentTime}>0:00</CurrentTimeBox>
                <TotalTimeBox ref={totalTime}>{duration}</TotalTimeBox>
              </TimeBox>
            </TimeLineGroup>
            <ButtonContainer>
              <BackwardButton videoRef={videoRef} />
              <PlayButton playMusic={playMusic} videoRef={videoRef} />
              <ForwardButton videoRef={videoRef} />
            </ButtonContainer>
            <VolumeGroup>
              <FontAwesomeIcon icon={faVolumeOff} />
              <VolumeBox
                type="range"
                step="0.1"
                value={volumeBar}
                min="0"
                max="1"
                ref={volumeRef}
                onChange={handleVolumeChange}
              />
              <FontAwesomeIcon icon={faVolumeUp} />
            </VolumeGroup>
            <Video src={srcValue} autoPlay={true} ref={videoRef} />
          </SongController>
        </Player>
      </Container>
    </>
  );
};

export default MusicPlay;
