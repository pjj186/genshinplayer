import React from "react";
import styled from "styled-components";

const SongInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: tomato;
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 80px;
`;

const SongController = ({ children }) => {
  return <SongInfoContainer>{children}</SongInfoContainer>;
};

export default SongController;
