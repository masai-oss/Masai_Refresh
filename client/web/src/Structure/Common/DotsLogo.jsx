import React from "react";
import { Dot, DotsWrapper } from "./Styles/DotsStyles"

const DotsLogo = () => {
  return (
    <DotsWrapper>
      {new Array(18).fill(0).map((_, i) => (
        [0, 1, 6].includes(i) ? <Dot key={i} style={{visibility: 'hidden'}} /> : <Dot key={i} />
      ))}
    </DotsWrapper>
  );
};

export { DotsLogo };
