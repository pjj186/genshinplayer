import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 60px;
  /* background-color: green; */
  bottom: 220px;
  justify-content: center;
  align-items: center;
  color: white;
`;

const SongTitle = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SongTitle;
