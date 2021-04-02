import React from "react";
import styled from "styled-components";

const Dots = styled.div`
  background: #1a2e37;
  margin: 5px;
  width: 5px;
  height: 5px;
  margin-right: 12px;
  margin-top: 10px;
  border-radius: 1px;
`;

const DotsDis = () => {
  return (
    <>
      {new Array(3).fill(0).map((a, i) => (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          {new Array(i + 5).fill(0).map((a, i) => (
            <Dots key={i} />
          ))}
        </div>
      ))}
    </>
  );
};

export { DotsDis };
