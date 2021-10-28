import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: wheat;
  width: 350px;
  height: 500px;
  border-radius: 15px;
`;

const MusicList = () => {
  return (
    <Container>
      <Player />
    </Container>
  );
};

export default MusicList;
