import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 60px;
  /* background-color: green; */
  bottom: 200px;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0.1em 0.1em 0 hsl(400 50% 30%);
`;

const SongTitle = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SongTitle;
