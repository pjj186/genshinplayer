import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div``;
const Image = styled.div`
  background-color: white;
  width: 100px;
  height: 100px;
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
