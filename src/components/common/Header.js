import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: wheat;
  width: 100%;
  height: 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  align-items: center;
`;

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Header;
