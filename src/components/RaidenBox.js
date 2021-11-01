import React, { useState } from "react";
import styled from "styled-components";
import { storageService } from "../fbase";
import { getDownloadURL, ref } from "@firebase/storage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border: 1px solid black;
  align-items: center;
  justify-content: space-between;
`;

const TextBox = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  cursor: default;
`;

const AvatarImg = styled.img`
  height: 55px;
  width: 55px;
`;

const Icon = styled.div`
  font-size: 40px;
  margin-right: 10px;
`;

const RaidenBox = () => {
  const [imgSrc, setImgSrc] = useState("");
  const getImgFile = async () => {
    const imgRef = ref(storageService, "images/raiden.png");
    const url = await getDownloadURL(imgRef);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function (event) {
      const blob = xhr.response;
      console.log(blob);
    };
    console.log(url);
    xhr.open("GET", url);
    xhr.send();
    setImgSrc(url);
  };

  getImgFile();

  return (
    <Container>
      <AvatarImg src={imgSrc} alt="Avatar" />
      <TextBox>Raiden Shogun</TextBox>
      <Link to="/play">
        <Icon>
          <FontAwesomeIcon icon={faPlayCircle} />
        </Icon>
      </Link>
    </Container>
  );
};

export default RaidenBox;
