import React from "react";
import GetCharcterData from "../utils/GetCharcterData";

const KazuhaBox = () => {
  const KAZUHA = 2;
  const KAZUHA_IMG = "images/kazuha.png";
  const KAZUHA_BG = "images/kazuhabg.jpg";
  const KAZUHA_NAME = "Kazuha";

  return (
    <GetCharcterData
      charcter={KAZUHA}
      charImg={KAZUHA_IMG}
      charBg={KAZUHA_BG}
      charName={KAZUHA_NAME}
    />
  );
};

export default KazuhaBox;
