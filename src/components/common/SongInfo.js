import React from "react";
import styled from "styled-components";

const SongInfoContainer = styled.div`
  background-color: tomato;
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 110px;
`;

const SongInfo = () => {
  return <SongInfoContainer></SongInfoContainer>;
};

export default SongInfo;
