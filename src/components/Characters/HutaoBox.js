import React from "react";
import GetCharcterData from "../utils/GetCharcterData";

const HutaoBox = () => {
  const HUTAO = 1;
  const HUTAO_IMG = "images/hutao_avatar.png";
  const HUTAO_BG = "images/hutaobg.jpg";
  const HUTAO_NAME = "Hutao";

  return (
    <GetCharcterData
      charcter={HUTAO}
      charImg={HUTAO_IMG}
      charBg={HUTAO_BG}
      charName={HUTAO_NAME}
    />
  );
};

export default HutaoBox;
