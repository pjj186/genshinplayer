import React, { useState, useEffect } from "react";
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
  border: 1px solid black;
  align-items: center;
  justify-content: space-between;
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
`;

const Icon = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const RaidenBox = () => {
  const MUSIC_LF = "currentmusic";
  const IMAGE_LF = "currentimage";
  const [imgSrc, setImgSrc] = useState("");
  const RAIDEN = 0;

  // 이미지를 받아온다.
  const getImgFile = async () => {
    const imgRef = ref(storageService, "images/raiden.png");
    const url = await getDownloadURL(imgRef);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    localforage.setItem(IMAGE_LF, {
      name: "Raiden Shogun",
      imageUrl: url,
    });
    xhr.onload = function (event) {
      const blob = xhr.response;
      console.log(blob);
    };
    xhr.open("GET", url);
    xhr.send();
    setImgSrc(url);
  };
  getImgFile(); // 이미지 받아오는 함수 호출

  // 음악을 받아옵니다.

  const getMusicFile = async () => {
    // 음악 선택
    const listRef = ref(storageService);
    const list = await listAll(listRef);
    const filename = list.items[RAIDEN].name; // 파일이름 가져오기
    const musicRef = ref(storageService, filename);
    const meta = await getMetadata(musicRef); // 지금 선택된 file 레퍼런스의 메타데이터 가져오기
    const url = await getDownloadURL(musicRef);
    const duration = await getBlobDuration(url);

    const xhr = new XMLHttpRequest();
    // getBlobDuration 라이브러리를 통해서 blob의 재생시간을 가져옴!!
    xhr.responseType = "blob";
    xhr.onload = function (event) {
      const blob = xhr.response;
      console.log(blob);
      // duration을 localforage에 저장했음. state에 저장해서 props로 보내려고했는데 잘 안됬다.
      localforage.setItem(MUSIC_LF, {
        name: meta.name,
        file: blob,
        duration,
      });
    };
    xhr.open("GET", url);
    xhr.send();
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container>
      <AvatarImg src={imgSrc} alt="Avatar" />
      <TextBox>Raiden Shogun</TextBox>
      <Link
        to={{
          pathname: `/play`,
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
