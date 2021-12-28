import React, { useEffect, useState, useRef, useContext } from "react";
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
  faBars,
  faVolumeUp,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import localforage from "localforage";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import { AppContext } from "../components/App";

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  width: 300px;
  height: 500px;
  border-radius: 15px;
  border: 0.5px solid black;
`;

const BackgroundContainer = styled.div`
  position: fixed;
  width: 300px;
  height: 500px;
  background-image: url(${(props) => props.bgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  z-index: -1;
  filter: blur(2px);
`;

const ButtonContainer = styled.div`
  display: flex;
  /* background-color: black; */
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 25px;
`;

const BackLink = styled(Link)`
  margin-left: 10px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
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
  color: #636e72b4;
`;

// 볼륨 range
const VolumeBox = styled.input`
  -webkit-appearance: none;
  width: 70%;
  margin: 0 5px;

  &:focus {
    outline: none;
  }
  // 포인터
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    margin-top: -5px;
  }

  // 바 스타일
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border-radius: 30px;
    border: 0.2px solid #010101;
  }
`;

// 타임라인 range
const TimeLineBox = styled.input`
  -webkit-appearance: none;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);

  &::-webkit-slider-runnable-track {
    height: 4px;
    -webkit-appearance: none;
    color: #13bba4;
    border: 0.2px solid #010101;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #dfe6e9;
    margin-top: -5px;
    box-shadow: -100vw 0 0 100vw rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.9);
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

const BottomGroup = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 0px 15px 15px;
`;

const MUSIC_LF = "currentmusic";
const IMAGE_LF = "currentimage";
const BG_LF = "currentbackground";

// MusicPlay 컴포넌트
const MusicPlay = ({ location }) => {
  const LFContext = useContext(AppContext);

  const videoRef = useRef();
  const volumeRef = useRef();
  const currentTime = useRef();
  const totalTime = useRef();
  const timelineel = useRef();

  const [srcValue, setSrcValue] = useState("");
  const [volumeBar, setVolumeBar] = useState(0.5);
  const [timeline, setTimeline] = useState(0);

  const loading = LFContext.musicLF || LFContext.imageLF || LFContext.bgLF;

  let volumeValue = volumeBar; // 볼륨 초깃값

  // 재생 페이지에서 새로 고침 시, 다시 데이터를 불러오고, 로딩을 끝내줄 함수가 필요함
  // duration, originDuration, name, img, bg 정보 다시 불러와야함

  // 음악 재생
  const playMusic = () => {
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

  // 볼륨 컨트롤
  const handleVolumeChange = (event) => {
    const {
      target: { value },
    } = event;
    setVolumeBar(value);
    volumeValue = value;
    videoRef.current.volume = value;
  };

  // 타임라인 업데이트
  const handleTimeUpdate = () => {
    currentTime.current.innerText = timeFormat(
      Math.floor(videoRef.current.currentTime)
    );
    setTimeline(Math.floor(videoRef.current.currentTime));
    if (videoRef.current.ended) {
      videoRef.current.currentTime = 0;
    }
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

    if (!loading) {
      volume.addEventListener("input", handleVolumeChange);
      video.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (!loading) {
        // Loading Reset
        LFContext.setMusicLF(true);
        LFContext.setImageLF(true);
        LFContext.setBgLF(true);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        volume.removeEventListener("input", handleVolumeChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <Container>
        <Player>
          {loading ? (
            <Loader />
          ) : (
            <>
              <BackgroundContainer bgSrc={location.state.bgSrc} />
              <Header>
                <BackLink to="/">
                  <FontAwesomeIcon icon={faBars} />
                </BackLink>
              </Header>
              <Avatar imgSrc={location.state.imgSrc} />
              <SongTitle>
                <Title>{LFContext.name}</Title>
              </SongTitle>
              <SongController>
                <TimeLineGroup>
                  <TimeLineBox
                    type="range"
                    step="1"
                    value={timeline}
                    min="0"
                    max={LFContext.originduration}
                    ref={timelineel}
                    onChange={handleTimelineChange}
                  />
                  <TimeBox>
                    <CurrentTimeBox ref={currentTime}>0:00</CurrentTimeBox>
                    <TotalTimeBox ref={totalTime}>
                      {LFContext.duration ? LFContext.duration : "0:00"}
                    </TotalTimeBox>
                  </TimeBox>
                </TimeLineGroup>
                <BottomGroup>
                  <ButtonContainer>
                    <BackwardButton videoRef={videoRef} />
                    <PlayButton
                      playMusic={playMusic}
                      videoRef={videoRef}
                      loading={loading}
                    />
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
                </BottomGroup>
                <Video
                  src={srcValue}
                  autoPlay={true}
                  ref={videoRef}
                  playsInline={true}
                  muted={false}
                />
              </SongController>
            </>
          )}
        </Player>
      </Container>
    </>
  );
};

export default MusicPlay;
