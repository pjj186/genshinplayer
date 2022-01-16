import React from "react";
import GetCharcterData from "../utils/GetCharcterData";

const GanyuBox = () => {
  const GANYU = 5;
  const GANYU_IMG = "images/ganyu.png";
  const GANYU_BG = "images/ganyubg.jpg";
  const GANYU_NAME = "Ganyu";

  return (
    <GetCharcterData
      charcter={GANYU}
      charImg={GANYU_IMG}
      charBg={GANYU_BG}
      charName={GANYU_NAME}
    />
  );
};

export default GanyuBox;
