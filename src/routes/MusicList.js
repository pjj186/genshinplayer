import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: white;
  width: 350px;
  height: 500px;
  border-radius: 15px;
  border: 1px solid black;
`;

const MusicList = () => {
  return (
    <Container>
      <Player />
    </Container>
  );
};

export default MusicList;
