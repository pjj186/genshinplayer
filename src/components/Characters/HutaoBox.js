import React, { useState } from "react";
import styled from "styled-components";
import getBlobDuration from "get-blob-duration";
import { storageService } from "../../fbase";
import { getDownloadURL, ref, getMetadata, listAll } from "@firebase/storage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import localforage from "localforage";

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

const HutaoBox = () => {
  const MUSIC_LF = "currentmusic";
  const IMAGE_LF = "currentimage";
  const BG_LF = "currentbackground";
  const [imgSrc, setImgSrc] = useState("");
  const [bgSrc, setBgSrc] = useState("");

  const HUTAO = 1;

  // 아바타이미지를 받아온다.
  const getImgFile = async () => {
    const imgRef = ref(storageService, "images/hutao_avatar.png");
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
    const imgRef = ref(storageService, "images/hutaobg.jpg");
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
    const filename = list.items[HUTAO].name; // 파일이름 가져오기
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
      localforage.setItem(MUSIC_LF, {
        name: meta.name,
        file: blob,
        duration,
      });
      localforage.setItem(IMAGE_LF, {
        imgSrc,
        name: "Hutao",
      });
      localforage.setItem(BG_LF, {
        bgSrc,
      });
    };
    xhr.open("GET", url);
    xhr.send();
  };

  return (
    <Container>
      <AvatarImg src={imgSrc} alt="Avatar" />
      <TextBox>Hutao</TextBox>
      <Link
        to={{
          pathname: `/play`,
          state: {
            imgSrc,
            bgSrc,
            name: "Hutao",
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

export default HutaoBox;
