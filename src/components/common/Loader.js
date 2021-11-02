import React from "react";
import styled, { keyframes } from "styled-components";

const Ringanim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LdsRing = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const InLdsRing = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #6c5ce7;
  border-radius: 50%;
  animation: ${Ringanim} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation-delay: ${(props) => props.delay};
  border-color: #6c5ce7 transparent transparent transparent;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 150px;
`;

const Loader = () => (
  <Container>
    <LdsRing>
      <InLdsRing delay="-0.45s"></InLdsRing>
      <InLdsRing delay="-0.3s"></InLdsRing>
      <InLdsRing delay="-0.15s"></InLdsRing>
    </LdsRing>
  </Container>
);

export default Loader;
