import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const PlayButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 1); // 그림자 나중에 수정
  cursor: pointer;
`;

const PlayButton = ({ playMusic, videoRef, loading }) => {
  const [isPlay, setIsPlay] = useState(false);

  const handleEnded = () => {
    if (videoRef.current.ended) setIsPlay(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!loading) {
      video.addEventListener("timeupdate", handleEnded);
    }
    return () => {
      if (!loading) {
        video.removeEventListener("timeupdate", handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPlay = () => {
    setIsPlay((prev) => !prev);
    if (!isPlay) {
      playMusic();
    }
    if (isPlay) {
      videoRef.current.pause();
    }
  };

  return (
    <PlayButtonContainer onClick={onClickPlay}>
      {isPlay ? (
        <FontAwesomeIcon icon={faPause} />
      ) : (
        <FontAwesomeIcon icon={faPlay} />
      )}
    </PlayButtonContainer>
  );
};

export default PlayButton;
