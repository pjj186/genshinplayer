import React, { useContext, useState } from "react";
import styled from "styled-components";
import getBlobDuration from "get-blob-duration";
import { storageService } from "../../fbase";
import { getDownloadURL, ref, getMetadata, listAll } from "@firebase/storage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import localforage from "localforage";
import { AppContext } from "../App";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
`;

const TextBox = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  cursor: default;
`;

const AvatarImg = styled.img`
  height: 55px;
  width: 55px;
  border-radius: 50%;
`;

const Icon = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const RaidenBox = () => {
  const MUSIC_LF = "currentmusic";
  const IMAGE_LF = "currentimage";
  const BG_LF = "currentbackground";

  const [imgSrc, setImgSrc] = useState("");
  const [bgSrc, setBgSrc] = useState("");

  const LFContext = useContext(AppContext);

  const RAIDEN = 0;

  const timeFormat = (seconds) => {
    // 시간 형식을 포맷하는 함수
    return new Date(seconds * 1000).toISOString().substr(15, 4);
  };

  // 아바타이미지를 받아온다.
  const getImgFile = async () => {
    const imgRef = ref(storageService, "images/raiden.png");
    const url = await getDownloadURL(imgRef);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function (event) {
      // eslint-disable-next-line no-unused-vars
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    setImgSrc(url);
  };
  getImgFile(); // 이미지 받아오는 함수 호출

  // 백그라운드 이미지를 받아온다.
  const getBackGround = async () => {
    const imgRef = ref(storageService, "images/raidenbg.jpg");
    const url = await getDownloadURL(imgRef);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function (evnet) {
      // eslint-disable-next-line no-unused-vars
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    setBgSrc(url);
  };
  getBackGround(); // 백그라운드 이미지 받아오기.

  // 음악을 받아옵니다.

  const getMusicFile = async () => {
    // 음악 선택
    const listRef = ref(storageService);
    const list = await listAll(listRef);
    const filename = list.items[RAIDEN].name; // MP3 리스트 파일이름 가져오기
    const musicRef = ref(storageService, filename);
    const meta = await getMetadata(musicRef); // 지금 선택된 file 레퍼런스의 메타데이터 가져오기
    const url = await getDownloadURL(musicRef);
    const duration = await getBlobDuration(url);

    const xhr = new XMLHttpRequest();
    // getBlobDuration 라이브러리를 통해서 blob의 재생시간을 가져옴!!
    xhr.responseType = "blob";
    xhr.onload = function (event) {
      const blob = xhr.response;
      // duration을 localforage에 저장했음. state에 저장해서 props로 보내려고했는데 잘 안됬다.
      localforage
        .setItem(MUSIC_LF, {
          name: meta.name,
          file: blob,
          duration,
        })
        .then(async () => {
          await localforage
            .getItem(MUSIC_LF)
            .then((value) => {
              LFContext.setDuration(timeFormat(value.duration));
              LFContext.setOriginDuration(value.duration);
            })
            .then(() => {
              LFContext.setMusicLF(false);
            });
        });
      localforage
        .setItem(IMAGE_LF, {
          imgSrc,
          name: "Raiden Shogun",
        })
        .then(async () => {
          await localforage
            .getItem(IMAGE_LF)
            .then((value) => {
              setImgSrc(value.imgSrc);
              LFContext.setName(value.name);
            })
            .then(() => {
              LFContext.setImageLF(false);
            });
        });
      localforage
        .setItem(BG_LF, {
          bgSrc,
        })
        .then(async () => {
          await localforage
            .getItem(BG_LF)
            .then((value) => {
              setBgSrc(value.bgSrc);
            })
            .then(() => {
              LFContext.setBgLF(false);
            });
        });
    };
    xhr.open("GET", url);
    xhr.send();
  };

  return (
    <Container>
      <AvatarImg src={imgSrc} alt="Avatar" />
      <TextBox>Raiden Shogun</TextBox>
      <Link
        to={{
          pathname: `/play`,
          state: {
            bgSrc,
            imgSrc,
          },
        }}
      >
        <Icon onClick={getMusicFile}>
          <FontAwesomeIcon icon={faPlayCircle} />
        </Icon>
      </Link>
    </Container>
  );
};

export default RaidenBox;
