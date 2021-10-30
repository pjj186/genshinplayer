import React, { useState } from "react";
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
import { storageService } from "../fbase";
import { getDownloadURL, listAll, ref } from "@firebase/storage";
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

const MusicPlay = () => {
  const [srcValue, setSrcValue] = useState("");

  const playMusic = () => {
    // 음악 재생
    localforage.getItem(MUSIC_LF, (err, value) => {
      if (err) {
        console.log(err);
      }
      console.log(value);
      const url = URL.createObjectURL(value.file);
      setSrcValue(url);
    });
  };

  const getMusicFile = async () => {
    // 음악 선택
    const musicRef = ref(
      storageService,
      "RaidenShogunBattleTheme(Phase 2).mp3"
    );
    const musiclist = await listAll(musicRef);
    console.log(musiclist);
    const url = await getDownloadURL(musicRef);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function (event) {
      const blob = xhr.response;
      console.log(blob);
      localforage.setItem(MUSIC_LF, {
        name: "음악파일.mp4",
        file: blob,
      });
    };
    console.log(url);
    xhr.open("GET", url);
    xhr.send();
  };

  return (
    <>
      <Container>
        <Player>
          <Header>
            <BackLink to="/">
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </BackLink>
          </Header>
          <Avatar />
          <SongInfo>
            <video src={srcValue} autoPlay={true}></video>
          </SongInfo>
          <ButtonContainer>
            <BackwardButton />
            <PlayButton getMusicFile={getMusicFile} />
            <ForwardButton playMusic={playMusic} />
          </ButtonContainer>
        </Player>
      </Container>
    </>
  );
};

export default MusicPlay;
