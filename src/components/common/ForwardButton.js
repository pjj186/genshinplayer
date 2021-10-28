import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

const ForwardButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 1);
  cursor: pointer;
`;

const ForwardButton = () => {
  return (
    <ForwardButtonContainer>
      <FontAwesomeIcon icon={faForward} />
    </ForwardButtonContainer>
  );
};

export default ForwardButton;
