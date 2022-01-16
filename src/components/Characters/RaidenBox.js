import React from "react";
import GetCharcterData from "../utils/GetCharcterData";

const RaidenBox = () => {
  const RAIDEN = 0;
  const RAIDEN_IMAGE = "images/raiden.png";
  const RAIDEN_BG = "images/raidenbg.jpg";
  const RAIDEN_NAME = "Raiden Shogun";

  return (
    <GetCharcterData
      charcter={RAIDEN}
      charImg={RAIDEN_IMAGE}
      charBg={RAIDEN_BG}
      charName={RAIDEN_NAME}
    />
  );
};

export default RaidenBox;
