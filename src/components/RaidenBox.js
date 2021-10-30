import React, { useState } from "react";
import styled from "styled-components";
import { storageService } from "../fbase";
import { getDownloadURL, ref } from "@firebase/storage";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border: 1px solid black;
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
      <img src={imgSrc} alt="Avatar"></img>
    </Container>
  );
};

export default RaidenBox;
