import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;
const Image = styled.div`
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
  // background-image: ; props를 이용해서 테마마다 다른 이미지 보여주기
`;

const Avatar = () => {
  return (
    <AvatarContainer>
      <Image />
    </AvatarContainer>
  );
};

export default Avatar;
