import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  background: #1a2e37;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  cursor: pointer;
`;

const DotsWrapper = styled.div`
  display: grid;
  width: fit-content;
  grid-gap: 15px 25px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  position: fixed;
  bottom: 20px;
  right: 20px;
`

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
