import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
const AvatarImage = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
`;

const Avatar = ({ imgSrc }) => {
  return (
    <AvatarContainer>
      <AvatarImage>
        <Image src={imgSrc} alt="Avatar" />
      </AvatarImage>
    </AvatarContainer>
  );
};

export default Avatar;
