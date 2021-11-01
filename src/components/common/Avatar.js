import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;
const AvatarImage = styled.div`
  display: flex;
  background-color: white;
  width: 130px;
  height: 130px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
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
