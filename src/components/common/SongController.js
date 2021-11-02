import React from "react";
import styled from "styled-components";

const SongInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: tomato;
  width: 100%;
  height: 220px;
  position: absolute;
  bottom: 0;
  border-radius: 0px 0px 15px 15px;
`;

const SongController = ({ children }) => {
  return <SongInfoContainer>{children}</SongInfoContainer>;
};

export default SongController;
