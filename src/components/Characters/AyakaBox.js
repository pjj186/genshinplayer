import React from "react";
import GetCharcterData from "../utils/GetCharcterData";

const AyakaBox = () => {
  const AYAKA = 4;
  const AYAKA_IMG = "images/ayaka.png";
  const AYAKA_BG = "images/ayakabg.jpg";
  const AYAKA_NAME = "Ayaka";

  return (
    <GetCharcterData
      charcter={AYAKA}
      charImg={AYAKA_IMG}
      charBg={AYAKA_BG}
      charName={AYAKA_NAME}
    />
  );
};

export default AyakaBox;
