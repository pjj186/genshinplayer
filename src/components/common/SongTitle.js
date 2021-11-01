import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100px;
  background-color: green;
  bottom: 180px;
  justify-content: center;
  align-items: center;
`;

const SongTitle = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SongTitle;
