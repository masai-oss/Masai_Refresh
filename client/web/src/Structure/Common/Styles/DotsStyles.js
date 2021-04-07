import styled from "styled-components";

export const Dot = styled.div`
  background: #1a2e37;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  cursor: pointer;
`;

export const DotsWrapper = styled.div`
  display: grid;
  width: fit-content;
  grid-gap: 15px 25px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  position: relative;
  margin-top: 20px;
  bottom: 20px;
  @media only screen and (max-width: 320px) {
    left: 44.8%;
  }
  @media only screen and (min-width: 375px) {
    left: 51.5%;
  }
  @media only screen and (min-width: 425px) {
    left: 57.5%;
  }
  @media only screen and (min-width: 430px) {
    left: 75%;
  }
  @media only screen and (min-width: 768px) {
    left: 76%;
  }
  @media only screen and (min-width: 992px) {
    left: 82.5%;
  }
  @media only screen and (min-width: 1200px) {
    left: 86.6%;
  }
`;
