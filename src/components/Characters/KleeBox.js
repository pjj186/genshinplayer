import React from "react";
import GetCharcterData from "../utils/GetCharcterData";

const KleeBox = () => {
  const KLEE = 3;
  const KLEE_IMAGE = "images/klee.png";
  const KLEE_BG = "images/kleebg.jpg";
  const KLEE_NAME = "Klee";

  return (
    <GetCharcterData
      charcter={KLEE}
      charImg={KLEE_IMAGE}
      charBg={KLEE_BG}
      charName={KLEE_NAME}
    />
  );
};

export default KleeBox;
