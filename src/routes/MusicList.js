import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import RaidenBox from "../components/Characters/RaidenBox";
import HutaoBox from "../components/Characters/HutaoBox";

const Container = styled.div`
  display: flex;
`;

const Player = styled.div`
  position: relative;
  margin: 0 auto;
  /* transform: translateY(50%); */
  background-color: white;
  width: 300px;
  height: 500px;
  border-radius: 15px;
  border: 1px solid black;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

const ListBox = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
  height: 400px;
  border: 1px solid black;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    height: 8px;
    width: 5px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
  }
`;

const MusicList = () => {
  return (
    <Container>
      <Player>
        <Header>
          <Title>
            <span>Genshin Music</span>
          </Title>
        </Header>
        <ListBox>
          <RaidenBox />
          <HutaoBox />
        </ListBox>
      </Player>
    </Container>
  );
};

export default MusicList;
